import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import RentForm from './RentForm';
import RentsTable from './RentsTable';
import styles from '../styles';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


@inject('store', 'uiStore') @observer
export default class ProfileRent extends Component {

  @observable tmpRent = initialRent;
  @observable dialog = { show: false };

  static propTypes = {
    store: React.PropTypes.object,
    uiStore: React.PropTypes.object,
  }

  handleOnSubmit = () => {
    const { store } = this.props;
    this.tmpRent.owner = store.user.id;
    store.addRent(toJS(this.tmpRent));
    this.tmpRent = {
      name: '',
      description: '',
      owner: null,
      image: null,
      imageFile: null,
    };
    this.dialog.show = false;
  }

  render() {
    const { store: { user } } = this.props;
    if (!user) {
      return <div>no user</div>;
    }
    return <div style={{height: '100%'}}>
      <RentsTable rents={user.rents} />
      <RentForm
        dialog={this.dialog}
        rent={this.tmpRent}
        onSubmit={this.handleOnSubmit}
      />
      <FloatingActionButton
        style={styles.floatingButton}
        onTouchTap={() => { this.dialog.show = true; }}
      >
        <ContentAdd />
      </FloatingActionButton>
    </div>;
  }
}

const initialRent = {
  name: '',
  description: '',
  owner: null,
  image: null,
  imageFile: null,
};
