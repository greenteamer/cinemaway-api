import { action, computed, extendObservable, observable, toJS} from 'mobx';
import * as API from '../api';
import { Store as store } from '../stores';


export default class Message {

  @observable id = null;

  constructor(obj) {
    extendObservable(this, obj ? obj : {});
    // autorun(() => {
    //   console.log('user request verified:', this.owner, this.object);
    // });
  }

  @action save = async () => {
    console.log('Message save obj: ', toJS(this));
    const response = await API.request(API.ENDPOINTS.POST_MESSAGE(), toJS(this));
    if (response) {
      this.id = response.id;
      store.messages.push(this);
    }
  }

  @computed get verified() {
    return this.owner !== this.object;
  }

  @computed get objectObj() {
    return store.users.find(u => u.id === this.object);
  }

  @computed get ownerObj() {
    return store.users.find(u => u.id === this.owner);
  }

  @computed get isOwner() {
    return this.owner === store.user.id;
  }
}

