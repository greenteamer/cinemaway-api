import { action, extendObservable, toJS} from 'mobx';
import { Store as store } from '../stores';
import * as API from '../api';


export default class Resume {
  constructor(obj) {
    extendObservable(this, initialData, obj ? obj : {});
  }

  @action setData(name, value) {
    this[name] = value;
  }

  @action save = async () => {
    this.owner = store.user.id;
    if (this.id) {
      await API.request(API.ENDPOINTS.PUT_RESUME(this.id), toJS(this));
    }
    else {
      const response = await API.request(API.ENDPOINTS.POST_RESUME(), toJS(this));
      if (response) {
        this.id = response.id;
        store.resumes.push(this);
      }
    }
  }

  @action toggleRubric(value) {
    const newArr = this.rubrics.includes(value)
      ? this.rubrics.filter(r => r !== value)
      : [...this.rubrics, value];
    this.rubrics.replace(newArr);
  }
}


const initialData = {
  phone: '',
  city: '',
  edu: '',
  filmography: '',
  ad: '',
  languages: '',
  text: '',
  rubrics: [],
};

