import { action, autorun, observable, runInAction, computed, toJS} from 'mobx';
import * as API from '../api';
import User from './User';
import Resume from './Resume';
import Vacancy from './Vacancy';
import Rent from './Rent';
import UserRequest from './UserRequest';
import UserResponse from './UserResponse';
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
  @observable vacancies = [];
  @observable rents = [];
  @observable userRequests = [];
  @observable userResponses = [];

  constructor() {
    super();
    this.getAllData();

    autorun(() => {
      if (!this.user) {
        browserHistory.push('/auth');
      }
      else {
        browserHistory.push('/profile');
      }
    });
  }

  @computed get avaliableVacancies() {
    if (!this.user) return [];
    // const vacancies = this.vacancies.filter(v => _.intersection(v.rubrics, this.user.rubrics).length);
    return observable(this.vacancies.filter(v => {
      return !this.user.inputRequests.map(req => req.vacancy).includes(v.id);
    }));
  }

  @computed get workers() {
    return observable(this.users.filter(user => !!user.resume));
  }

  @action clearData() {
    Object.assign(this, initialData);
  }

  @action getAllData = async () => {
    uiStore.startLoading();
    console.log('Store getAllData ');
    const response = await API.request(API.ENDPOINTS.GET_ALL_DATA());
    runInAction('update state after fetching data', () => {
      if (response) {
        this.user = response.user ? new User(response.user) : response.user;
        this.users.replace(response.users.map(u => new User(u)));
        this.resumes.replace(response.resumes.map(r => new Resume(r)));
        this.groups.replace(response.groups);
        this.rubrics.replace(response.rubrics);
        this.vacancies.replace(response.vacancies.map(v => new Vacancy(v)));
        this.rents.replace(response.rents.map(rent => new Rent(rent)));
        this.userRequests.replace(response.requests.map(req => new UserRequest(req)));
        this.userResponses.replace(response.responses.map(res => new UserResponse(res)));
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
    console.log('store add rent id: ', newObj.id);
  }

  @action addUserRequest = async (userRequestObj) => {
    const checkOwner = userRequestObj.owner !== userRequestObj.object;
    const checkSubject = userRequestObj.vacancy || userRequestObj.rent;
    if (checkOwner && checkSubject) {
      const userRequest = new UserRequest(userRequestObj);
      userRequest.save();
      const { owner, object } = userRequestObj;
      await API.request(API.ENDPOINTS.SEND_MAIL(), {owner, object});
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
};
