import { action, autorun, observable, runInAction, computed, toJS} from 'mobx';
import * as API from '../api';
import Profile from './Profile';
import uiStore from './UIStore';
import singleton from 'singleton';
import { browserHistory } from 'react-router';


class Store extends singleton {
  @observable isLoading;
  @observable token;
  @observable user = null;
  @observable profile = null;
  @observable dialog = {};


  constructor() {
    super();
    Object.assign(this, initialData);
    uiStore.startLoading();
    this.getUser();
    this.getAllData();

    autorun(() => {
      // console.log('Store user: ', toJS(this.user));
      if (!this.user) {
        browserHistory.push('/auth');
      }
    });

    autorun(() => {
      if (this.profile) {
        uiStore.finishLoading();
      }
    });
  }

  @action clearData() {
    Object.assign(this, initialData);
  }

  async getUser() {
    const response = await API.request(API.ENDPOINTS.GET_USER());
    console.log('Store getUser response: ', response);
    if (response) {
      this.user = response;
      browserHistory.push('/profile');
    }
  }

  async getAllData() {
    const response = await API.request(API.ENDPOINTS.GET_ALL_DATA());
    if (response) {
      console.log('Store getAllData response:', response);
      if (response.user) {
        this.user = response.user;
        this.profile = new Profile(response.profile);
      }
      // browserHistory.push('/profile');
    }
  }

  async register(email, password1, password2) {
    const response = await API.request(API.ENDPOINTS.REGISTER(), { email, password1, password2 });
    if (response) {
      this.user = response;
      this.profile = new Profile();
      browserHistory.push('/profile');
    }
  }

  async login(email, password) {
    const response = await API.request(API.ENDPOINTS.LOGIN(), { email, password });
    if (response) {
      this.user = response;
      browserHistory.push('/profile');
    }
  }

  async logout() {
    const response = await API.request(API.ENDPOINTS.LOGOUT());
    if (!response) {
      this.user = response;
      this.clearData();
    }
  }


}

const store = Store.get();
window.store = store;
window.uiStore = uiStore;
window.mobx = {action, observable, runInAction, computed, toJS};
export default store;


const initialData = {
  user: null,
  profile: null,
};

