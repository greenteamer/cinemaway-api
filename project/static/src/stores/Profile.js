import { action, autorun, observable, extendObservable, computed, toJS} from 'mobx';
import { Store, UIStore } from '../stores';
import * as API from '../api';


export default class Profile {
  @observable isWorker = true;
  @observable isSaved = false;

  constructor(obj) {
    extendObservable(this, initialData, obj ? obj : {});
    console.log('Profile constructor obj: ', obj);
    // this.isSaved = obj && obj.isSaved ? obj.isSaved : false;
    this.owner = Store.user.id;

    autorun(() => {
      this.owner = Store.user ? Store.user.id : null;
    });
  }

  @computed get role() {
    return this.isWorker ? 'worker' : 'employer';
  }

  @action setRole(value) {
    if (value === 'worker') {
      this.isWorker = true;
    }
    else if (value === 'employer') {
      this.isWorker = false;
    }
  }

  @action setData(name, value) {
    this[name] = value;
  }

  @action save() {
    UIStore.openDialog();
  }

  async serverSave() {
    if (this.id) {
      // await API.request(API.ENDPOINTS.PUT_PROFILE(this.id), toJS(this));
      const response = await API.request(API.ENDPOINTS.PUT_PROFILE(this.id), toJS(this));
      console.log('Profile serverSave response: ', response);
      this.isSaved = response.isSaved;
    }
    else {
      const response = await API.request(API.ENDPOINTS.POST_PROFILE(), toJS(this));
      // await API.request(API.ENDPOINTS.POST_PROFILE(), toJS(this));
      //  console.log('Profile post response: ', response);
      this.isSaved = response.isSaved;
    }
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
  image: '',
  text: '',
};

