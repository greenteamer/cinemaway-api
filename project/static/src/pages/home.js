import React from 'react';
import { observer, inject } from 'mobx-react';
import GridList from './rubrics/GridList';


@inject('store') @observer
export default class Home extends React.Component {
  static propTypes = {
    store: React.PropTypes.object,
  }
  render() {
    const { store } = this.props;
    const rubrics = store.rubrics.filter(r => !r.parent);
    // const params = new URL(window.location.href).searchParams;
    // if (params.get('token')) {
    //   console.log('location params: ', params.get('token'));
    //   window.localStorage.setItem('token', params.get('token'));
    // }
    return <div>
      <GridList rubrics={rubrics} />
    </div>;
  }
}

