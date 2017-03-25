import { toJS, action, autorun, observable } from 'mobx';
import singleton from 'singleton';


class UIStore extends singleton {
  @observable isLoading = false;
  @observable dialog = false;
  @observable dialogMessage = 'dialog message';
  @observable snackbar = {
    open: false,
    message: '',
  };

  constructor() {
    super();
    this.isLoading = false;
    autorun(() => {
      if (this.snackbar.open) {
        setTimeout(() => { this.snackbar.open = false; }, 4000);
      }
      console.log('snackbar: ', toJS(this.snackbar));
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
