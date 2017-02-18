import { action, extendObservable, observable, toJS} from 'mobx';
import * as API from '../api';
import { Store as store } from '../stores';


export default class UserResponse {
  @observable id = null;

  constructor(obj) {
    extendObservable(this, obj ? obj : {});
  }

  @action save = async () => {
    if (this.id) {
      await API.request(API.ENDPOINTS.PUT_USERRESPONSE(this.id), toJS(this));
    }
    else {
      const response = await API.request(API.ENDPOINTS.POST_USERRESPONSE(), toJS(this));
      if (response) {
        this.id = response.id;
        store.userResponses.push(this);
        API.request(API.ENDPOINTS.SEND_RESPONSE_MAIL(), {
          response: response.id,
        });
      }
    }
  }

}

