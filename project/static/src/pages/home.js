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
    return <div>
      <GridList rubrics={rubrics} />
    </div>;
  }
}

