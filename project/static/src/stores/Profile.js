import { action, autorun, observable, runInAction, computed, toJS} from 'mobx';


export default class Profile {
  @observable role = null;
  @observable firstname = "";
  @observable lastname = "";
  @observable phone = "";
  @observable city = "";
  @observable edu = "";
  @observable filmography = "";
  @observable ad = "";
  @observable languages = "";
  @observable image = "";
  @observable text = "";

  constructor(store, obj) {
    this._store = store;
    this.user = obj.id;
    this.role = obj.role ? obj.role : 0;
    this.firstname = obj.firstname;
    this.lastname = obj.lastname;
  }

  @action setRole(role) {
    this.role = role;
  }

  @action setData(name, value) {
    this[name] = value;
  }
}
