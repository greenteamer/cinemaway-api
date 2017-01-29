import { action, autorun, observable } from 'mobx';
import singleton from 'singleton';


class UIStore extends singleton {
  @observable isLoading = false;
  @observable dialog = false;
  @observable dialogMessage = 'dialog message';

  constructor() {
    super();
    this.isLoading = false;
    autorun(() => {
      console.log('isLoading: ', this.isLoading);
    });
    autorun(() => {
      console.log('uiStore dialog : ', this.dialog);
    });
  }

  @action startLoading = () => {
    this.isLoading = true;
  }

  @action finishLoading = () => {
    this.isLoading = false;
  }

  @action openDialog() {
    this.dialog = true;
  }

  @action closeDialog() {
    this.dialog = false;
  }

}

const uiStore = UIStore.get();
export default uiStore;
