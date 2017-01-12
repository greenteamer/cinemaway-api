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
  @observable products = [];

  constructor() {
    super();
    this.isLoading = false;

    this.getUser();
    this.getAllData();

    autorun(() => {
      console.log('Store user: ', toJS(this.user));
      if (!this.user) {
        browserHistory.push('/auth');
      }
    });
  }

  async getUser() {
    // console.log('TESTStore getUser this: ', this);
    const response = await API.request(API.ENDPOINTS.GET_USER());
    if (response) {
      this.user = response;
      this.profile = new Profile(this, response);
      browserHistory.push('/profile');
    }
  }

  async getAllData() {
    const response = await API.request(API.ENDPOINTS.GET_ALL_DATA());
    if (response) {
      console.log('+++ Store all data: ', response);
      // browserHistory.push('/profile');
    }
  }

  async register(email, password1, password2) {
    const response = await API.request(API.ENDPOINTS.REGISTER(), { email, password1, password2 });
    if (response) {
      this.user = response;
      this.profile = new Profile(this, response);
      browserHistory.push('/profile');
    }
  }

  async login(email, password) {
    const response = await API.request(API.ENDPOINTS.LOGIN(), { email, password });
    if (response) {
      this.user = response;
      this.profile = new Profile(this, response);
      browserHistory.push('/profile');
    }
  }

  async logout() {
    const response = await API.request(API.ENDPOINTS.LOGOUT());
    if (!response) {
      this.user = response;
    }
  }

  @action getProducts() {
    console.log('store get products');
  }
}

const store = Store.get();
window.store = store;
window.mobx = {action, observable, runInAction, computed, toJS};
export default store;
