import { action, computed, extendObservable, observable, toJS} from 'mobx';
import { Store as store } from '../stores';
import * as API from '../api';


export default class Rent {
  @observable id = null;

  constructor(obj) {
    extendObservable(this, obj ? obj : {});
  }

  @action setData(name, value) {
    this[name] = value;
  }

  @action save = async () => {
    if (this.id) {
      await API.request(API.ENDPOINTS.PUT_RENT(this.id), toJS(this));
    }
    else {
      const response = await API.request(API.ENDPOINTS.POST_RENT(), toJS(this));
      if (response) {
        this.id = response.id;
        store.rents.push(this);
      }
    }
  }

  @computed get absoluteUrl() {
    return `/rents/${this.id}`;
  }

}

