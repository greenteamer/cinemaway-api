import { action, observable, extendObservable, computed, toJS} from 'mobx';
import { Store as store, UIStore as uiStore } from '../stores';
import * as API from '../api';


export default class User {
  @observable groups = [];

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

  // @action toggleRubric(value) {
  //   const newArr = this.rubrics.includes(value)
  //     ? this.rubrics.filter(r => r !== value)
  //     : [...this.rubrics, value];
  //   this.rubrics.replace(newArr);
  // }

  @action setData(name, value) {
    this[name] = value;
  }

  @action save() {
    uiStore.openDialog();
  }

  async serverSave() {
    if (this.id) {
      await API.request(API.ENDPOINTS.PUT_USER(this.id), toJS(this));
    }
    else {
      const response = await API.request(API.ENDPOINTS.POST_USER(), toJS(this));
      if (response) {
        this.id = response.id;
      }
    }
  }

  @computed get resume() {
    return store.resumes.find(r => r.owner === this.id);
  }

  @computed get vacancies() {
    return observable( store.vacancies.filter(v => v.owner === this.id) );
  }

  @computed get requests() {
    return observable( store.userRequests.filter(req => req.owner === this.id) );
  }

  @computed get requestsInvites() {
    return observable( store.userRequests.filter(req => req.object === this.id) );
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

