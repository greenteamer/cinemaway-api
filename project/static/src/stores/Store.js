import { action, autorun, observable, runInAction, computed, toJS} from 'mobx';
import * as API from '../api';
import User from './User';
import Vacancy from './Vacancy';
import uiStore from './UIStore';
import singleton from 'singleton';
import { browserHistory } from 'react-router';


class Store extends singleton {
  @observable isLoading;
  @observable token;
  @observable user = null;
  @observable groups = [];
  @observable dialog = {};
  @observable rubrics = [];
  @observable vacancies = [];


  constructor() {
    super();
    this.getAllData();

    autorun(() => {
      if (!this.user) {
        console.log('autorun user push auth');
        browserHistory.push('/auth');
      }
      else {
        browserHistory.push('/profile/vacancies');
      }
    });
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
        console.log('Store getAllData response:', response);
        this.user = response.user ? new User(response.user) : response.user;
        this.groups.replace(response.groups);
        this.rubrics.replace(response.rubrics);
        this.vacancies.replace(response.vacancies.map(v => new Vacancy(v)));
      }
      console.log('Store getAllData before uiStore.finishLoading()');
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
    if (response) {
      console.log('login response: ', response);
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

  @action addVacancy(vacancy) {
    const newObj = new Vacancy(vacancy);
    newObj.save();
    this.vacancies.push(newObj);
  }

}

const store = Store.get();
window.store = store;
window.uiStore = uiStore;
window.mobx = {action, observable, runInAction, computed, toJS};
export default store;


const initialData = {
  user: null,
  groups: [],
  rubrics: [],
  vacancies: [],
};
