import { action, autorun, computed, extendObservable, observable, toJS} from 'mobx';
import * as API from '../api';
import { Store as store } from '../stores';


export default class UserRequest {

  @observable id = null;

  constructor(obj) {
    extendObservable(this, obj ? obj : {});
    autorun(() => {
      console.log('user request verified:', this.owner, this.object);
    });
  }

  @action save = async () => {
    if (this.id) {
      await API.request(API.ENDPOINTS.PUT_USERREQUEST(this.id), toJS(this));
    }
    else {
      const response = await API.request(API.ENDPOINTS.POST_USERREQUEST(), toJS(this));
      if (response) {
        this.id = response.id;
        store.userRequests.push(this);
      }
    }
  }

  @computed get verified() {
    return this.owner !== this.object;
  }

  @computed get vacancyObj() {
    return store.vacancies.find(v => v.id === this.vacancy);
  }

  @computed get rentObj() {
    return store.rents.find(rent => rent.id === this.rent);
  }

  @computed get objectObj() {
    return store.users.find(u => u.id === this.object);
  }

  @computed get ownerObj() {
    return store.users.find(u => u.id === this.owner);
  }

  @computed get userResponse() {
    return store.userResponses.find(res => res.userRequest === this.id);
  }
}

