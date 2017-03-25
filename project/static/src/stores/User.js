import { action, observable, extendObservable, computed, toJS} from 'mobx';
import { Store as store, UIStore as uiStore } from '../stores';
import * as API from '../api';


export default class User {
  @observable groups = [];
  @observable avatarFile = null;

  constructor(obj) {
    extendObservable(this, initialData, obj ? obj : {});
    this.protected = obj ? obj.groups.length !== 0 : false;
  }

  @computed get isWorker() {
    return this.groups[0] === 2;
  }

  @action setRole(value) {
    this.groups.replace([value]);
  }


  @action setData(name, value) {
    this[name] = value;
  }

  @action save() {
    uiStore.openDialog();
  }

  async serverSave() {
    const obj = toJS(this);
    if (obj.avatarFile) {
      obj.avatar = obj.avatarFile;
    }
    else {
      delete obj.avatar;
    }
    if (obj.id) {
      await API.request(API.ENDPOINTS.PUT_USER(obj.id), obj);
      uiStore.snackbar.open = true;
      uiStore.snackbar.message = 'Информация пользователя обновлена';
    }
    else {
      const response = await API.request(API.ENDPOINTS.POST_USER(), obj);
      if (response) {
        this.id = response.id;
        uiStore.snackbar.open = true;
        uiStore.snackbar.message = 'Пользователь добавлен';
      }
    }
  }

  @computed get resume() {
    return store.resumes.find(r => r.owner === this.id);
  }

  @computed get vacancies() {
    return observable( store.vacancies.filter(v => v.owner === this.id) );
  }

  @computed get rents() {
    return observable( store.rents.filter(rent => rent.owner === this.id) );
  }

  @computed get inputRequests() {
    return observable( store.userRequests.filter(req => req.object === this.id) );
  }

  @computed get outputRequests() {
    return observable( store.userRequests.filter(req => req.owner === this.id) );
  }

  @computed get fullName() {
    return `${this.firstname} ${this.lastname}`;
  }

  @computed get absoluteUrl() {
    return `/users/${this.id}`;
  }
}


const initialData = {
  firstname: '',
  lastname: '',
  phone: '',
  city: '',
  edu: '',
  filmography: '',
  ad: '',
  languages: '',
  avatar: '',
  text: '',
  groups: [],
};

