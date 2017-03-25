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
      const response = await API.request(API.ENDPOINTS.PUT_RENT(obj.id), obj);
      uiStore.snackbar.open = true;
      uiStore.snackbar.message = "Позиция сохранена";
    }
    else {
      const response = await API.request(API.ENDPOINTS.POST_RENT(), obj);
      if (response) {
        console.log('response: ', response);
        this.id = response.id;
        this.image = response.image;
        store.rents.push(this);
        uiStore.snackbar.open = true;
        uiStore.snackbar.message = "Позиция добавлена";
      }
    }
  }

  @computed get ownerObj() {
    return store.users.find(user => user.id === this.owner);
  }

  @computed get absoluteUrl() {
    return `/rents/${this.id}`;
  }

  @computed get inputRequests() {
    return observable(store.userRequests.filter(req => req.rent === this.id));
  }

  @computed get profileUrl() {
    return `/profile/rents/${this.id}`;
  }

}

