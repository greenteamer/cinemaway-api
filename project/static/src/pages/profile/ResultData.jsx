import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import { inject, observer } from 'mobx-react';


@inject('store') @observer
export default class ResultData extends Component {
  render() {
    const { store, style } = this.props;
    return <div style={style}>
      <h1>Данные: </h1>
      <p>id: {store.profile.id}</p>
      <Divider />
      <p>id: {store.profile.lastname}</p>
      <Divider />
      <p>id: {store.profile.firstname}</p>
      <Divider />
    </div>;
  }
}
