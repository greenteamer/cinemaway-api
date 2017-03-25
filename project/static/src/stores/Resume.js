import { action, extendObservable, toJS, computed } from 'mobx';
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
    const obj = toJS(this);
    if (this.id) {
      await API.request(API.ENDPOINTS.PUT_RESUME(obj.id), obj);
    }
    else {
      const response = await API.request(API.ENDPOINTS.POST_RESUME(), obj);
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

  @action toggleActive() {
    this.isActive = !this.isActive;
  }

  @action togglePhoneActive() {
    console.log('Resume store: ', toJS(this));
    this.phoneIsActive = !this.phoneIsActive;
  }

  @computed get strokeRubrics() {
    const rubrics = store.rubrics
      .filter(r => this.rubrics.includes(r.id))
      .map(r => r.name)
      .join(', ');
    return rubrics;
      // console.log('Resume rubrics: ', rubrics);
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
  isActive: true,
  rubrics: [],
};

