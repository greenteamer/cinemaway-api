import { action, observable } from 'mobx';
import singleton from 'singleton';


class UIStore extends singleton {
  @observable isLoading = false;

  constructor() {
    super();
    this.isLoading = false;
  }

  @action startLoading = () => {
    this.isLoading = true;
  }

  @action finishLoading = () => {
    this.isLoading = false;
  }
}

const uiStore = UIStore.get();
export default uiStore;
