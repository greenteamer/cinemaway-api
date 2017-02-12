import { action, computed, extendObservable, observable, toJS} from 'mobx';
import { Store as store } from '../stores';
import * as API from '../api';


export default class Rent {
  @observable id = null;
  @observable imageFile = null;

  constructor(obj) {
    extendObservable(this, obj ? obj : {});
  }

  @action setData(name, value) {
    this[name] = value;
  }

  @action save = async () => {
    const obj = toJS(this);
    if (obj.imageFile) {
      obj.image = obj.imageFile;
    }
    else {
      delete obj.image;
    }
    if (obj.id) {
      await API.request(API.ENDPOINTS.PUT_RENT(obj.id), obj);
    }
    else {
      const response = await API.request(API.ENDPOINTS.POST_RENT(), obj);
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

