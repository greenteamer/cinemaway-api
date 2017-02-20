import { action, computed, extendObservable, observable, toJS} from 'mobx';
import { Store as store } from '../stores';
import * as API from '../api';


export default class Vacancy {
  @observable id = null;

  constructor(obj) {
    extendObservable(this, obj ? obj : {});
  }

  @action setData(name, value) {
    this[name] = value;
  }

  @action save = async () => {
    console.log('Vacancy rubrics: ', toJS(this));
    if (this.id) {
      await API.request(API.ENDPOINTS.PUT_VACANCY(this.id), toJS(this));
    }
    else {
      const response = await API.request(API.ENDPOINTS.POST_VACANCY(), toJS(this));
      if (response) {
        this.id = response.id;
        store.vacancies.push(this);
      }
    }
  }

  @computed get inputRequests() {
    return observable(store.userRequests.filter(req => req.vacancy === this.id));
  }

  @computed get ownerObj() {
    return store.users.find(user => user.id === this.owner);
  }

  @computed get absoluteUrl() {
    return `/vacancies/${this.id}`;
  }

  @computed get profileUrl() {
    return `/profile/vacancies/${this.id}`;
  }
}

