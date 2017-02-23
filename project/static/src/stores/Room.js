import { action, computed, extendObservable, observable, toJS} from 'mobx';
import * as API from '../api';
import { Store as store } from '../stores';


export default class Room {

  @observable id = null;

  constructor(obj) {
    extendObservable(this, obj ? obj : {});
  }

  @action save = async () => {
    const response = await API.request(API.ENDPOINTS.POST_ROOM(), toJS(this));
    if (response) {
      this.id = response.id;
      store.rooms.push(this);
    }
  }

  @computed get verified() {
    return this.user1 !== this.user2;
  }

  @computed get messages() {
    const messages = observable(store.messages.filter(m => m.room === this.id));
    console.log('room.js messages: ', toJS(messages));
    return messages;
  }

  @computed get user1Obj() {
    return store.users.find(u => u.id === this.user1);
  }

  @computed get user2Obj() {
    return store.users.find(u => u.id === this.user2);
  }

  @computed get objectObj() {
    if (this.user1 !== store.user.id) {
      return this.user1Obj;
    }
    return this.user2Obj;
  }

}

