import React from 'react';
import { inject, observer } from 'mobx-react';
import GridList from './GridList';


@inject('store') @observer
export default class Rubrics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  static propTypes = {
    store: React.PropTypes.object,
    params: React.PropTypes.object,
    rubricId: React.PropTypes.number,
  }

  render() {
    const { store } = this.props;
    const filteredRubrics = store.rubrics.filter(r => r.level === 0);
    return <div>
      <GridList rubrics={filteredRubrics} />
    </div>;
  }
}
