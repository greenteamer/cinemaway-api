import { action, autorun, observable, runInAction, computed, toJS} from 'mobx';
import * as API from '../api';
import User from './User';
import Resume from './Resume';
import Vacancy from './Vacancy';
import Rent from './Rent';
import UserRequest from './UserRequest';
import UserResponse from './UserResponse';
import Message from './Message';
import Room from './Room';
import uiStore from './UIStore';
import singleton from 'singleton';
import { browserHistory } from 'react-router';
// import _ from 'underscore';


class Store extends singleton {
  @observable isLoading;
  @observable token;
  @observable user = null;
  @observable groups = [];
  @observable users = [];
  @observable resumes = [];
  @observable dialog = {};
  @observable rubrics = [];
  @observable rentRubrics = [];
  @observable vacancies = [];
  @observable rents = [];
  @observable userRequests = [];
  @observable userResponses = [];
  @observable messages = [];
  @observable rooms = [];
  @observable geolocation = {
    fullCity: '',
  }

  constructor() {
    super();
    this.getAllData();
    autorun(() => {
      if (this.user && this.user.resume && this.user.resume.city === '') {
        getCity();
      }
    });
  }

  @computed get avaliableVacancies() {
    return this.vacancies;
  }

  @computed get workers() {
    return observable(this.users.filter(user => {
      return user.resume ? user.resume.isActive : false;
    }));
  }

  @action clearData() {
    Object.assign(this, initialData);
  }

  @action getAllData = async () => {
    uiStore.startLoading();
    console.log('Store getAllData ');
    const response = await API.request(API.ENDPOINTS.GET_ALL_DATA());
    runInAction('update state after fetching data', async () => {
      if (response) {
        this.user = response.user ? new User(response.user) : response.user;
        this.users.replace(response.users.map(u => new User(u)));
        this.resumes.replace(response.resumes.map(r => new Resume(r)));
        this.groups.replace(response.groups);
        this.rubrics.replace(response.rubrics);
        this.rentRubrics.replace(response.rentRubrics);
        this.vacancies.replace(response.vacancies.map(v => new Vacancy(v)));
        this.rents.replace(response.rents.map(rent => new Rent(rent)));
        this.userRequests.replace(response.requests.map(req => new UserRequest(req)));
        this.userResponses.replace(response.responses.map(res => new UserResponse(res)));
        this.messages.replace(response.messages.map(res => new Message(res)));
        this.rooms.replace(response.rooms.map(res => new Room(res)));
      }
      uiStore.finishLoading();
    });
  }

  async register(email, password1, password2) {
    const response = await API.request(API.ENDPOINTS.REGISTER(), { email, password1, password2 });
    if (response) {
      this.user = new User(response);
      browserHistory.push('/profile');
    }
  }

  async login(email, password) {
    console.log('Store login');
    const response = await API.request(API.ENDPOINTS.LOGIN(), { email, password });
    console.log('login response: ', response);
    if (response) {
      this.user = new User(response);
      browserHistory.push('/profile');
    }
  }

  async logout() {
    const response = await API.request(API.ENDPOINTS.LOGOUT());
    if (!response) {
      this.user = response;
    }
  }

  @action addResume(resume) {
    const newObj = new Resume(resume);
    newObj.save();
  }

  @action addVacancy(vacancy) {
    const newObj = new Vacancy(vacancy);
    newObj.save();
    console.log('store add vacancy id: ', newObj.id);
    // this.vacancies.push(newObj);
  }

  @action deleteVacancy = async (id) => {
    await API.request(API.ENDPOINTS.DELETE_VACANCY(id));
    this.vacancies.replace(this.vacancies.filter(v => v.id !== id));
  }

  @action addRent(rent) {
    const newObj = new Rent(rent);
    newObj.save();
  }

  @action addMessage = async (text, object) => {
    const owner = this.user.id;
    const roomObj = this.findRoom(owner, object);
    let room = null;
    if (roomObj) {
      room = roomObj.id;
      const newObj = new Message({ text, owner, object, room });
      newObj.save();
    }
    else {
      const user2 = store.users.find(u => u.id === object);
      const response = await API.request(API.ENDPOINTS.POST_ROOM(), {user1: this.user.id, user2: user2.id});
      if (response) {
        this.rooms.push(new Room(response));
        room = response.id;
        const newObj = new Message({ text, owner, object, room });
        newObj.save();
      }
    }
  }

  @action deleteRent = async (id) => {
    await API.request(API.ENDPOINTS.DELETE_RENT(id));
    this.rents.replace(this.rents.filter(rent => rent.id !== id));
  }

  @action addUserRequest = async (userRequestObj) => {
    const checkOwner = userRequestObj.owner !== userRequestObj.object;
    const checkSubject = userRequestObj.vacancy || userRequestObj.rent;
    if (checkOwner && checkSubject) {
      const userRequest = new UserRequest(userRequestObj);
      userRequest.save();
      // const { owner, object } = userRequestObj;
      // await API.request(API.ENDPOINTS.SEND_REQUEST_MAIL(), {owner, object});
    }
    else {
      console.log('userRequest not verified');
    }
  }

  @action deleteRequest = async (id) => {
    await API.request(API.ENDPOINTS.DELETE_USERREQUEST(id));
    this.userRequests.replace(this.userRequests.filter(req => req.id !== id));
  }

  @action addUserResponse = async (owner, userRequest, status, text) => {
    const userResponse = new UserResponse({owner, userRequest, status, text});
    userResponse.save();
  }

  @computed get sortedResumes() {
    return observable(this.resumes.sort(( r1, r2 ) => new Date(r2.created_at) - new Date(r1.created_at)));
  }

  findRoom = (user1, user2) => {
    return this.rooms.find(r => {
      const condition1 = r.user1 === user1 && r.user2 === user2;
      const condition2 = r.user2 === user1 && r.user1 === user2;
      return condition1 || condition2;
    });
  }

  findMessgaes = (user1, user2) => {
    const room = this.findRoom(user1, user2);
    return observable(this.messages.filter(m => room ? room.id === m.room : false));
  }
}

const store = Store.get();
window.store = store;
window.uiStore = uiStore;
window.mobx = {action, observable, runInAction, computed, toJS};
export default store;


const initialData = {
  user: null,
  users: [],
  resumes: [],
  groups: [],
  rubrics: [],
  vacancies: [],
  rents: [],
  userRequests: [],
  userResponses: [],
  messages: [],
  rooms: [],
};


function getCity() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const point = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      new google.maps.Geocoder().geocode({latLng: point}, (res, status) => {
        if (status === google.maps.GeocoderStatus.OK && typeof res[0] !== 'undefined') {
          const obj = res.find(r => r.types.includes('locality'));
          if (obj) {
            store.geolocation.fullCity = obj.formatted_address;
            store.user.resume.city = obj.formatted_address;
          }
        }
      });
    }, () => {
      console.log('geoposition error');
    });
  }
}
