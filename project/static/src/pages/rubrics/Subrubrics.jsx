import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
// import AdList from '../ads/AdList';
import SearchPage from '../search';


@inject('store') @observer
export default class Home extends React.Component {
  static propTypes = {
    store: React.PropTypes.object,
    params: React.PropTypes.object,
  }
  render() {
    const { store, params } = this.props;
    const rId = parseInt(params.rubricId, 10);
    const rubrics = store.rubrics.filter(r => r.parent === rId);
    const condition = rubrics && rubrics.length !== 0;
    return <div>
      {condition
        && rubrics.map((rubric, i) =>
          <RaisedButton
            key={i}
            label={rubric.name}
            fullWidth={true}
            onTouchTap={() => browserHistory.push(rubric.url)}
          />
        ) ||
        <SearchPage
          rubricId={rId}
        />
      }
    </div>;
  }
}

