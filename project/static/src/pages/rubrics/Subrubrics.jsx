import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import AdList from '../ads/AdList';


// const styles = {
//   linkContainer: {
//     float: 'left',
//     padding: '15px',
//     width: '33.33%',
//     backgroundColor: '#cecece',
//   },
// };




@inject('store') @observer
export default class Home extends React.Component {
  static propTypes = {
    store: React.PropTypes.object,
    params: React.PropTypes.object,
  }
  render() {
    const { store, params } = this.props;
    const rubrics = store.rubrics.filter(r => r.parent === parseInt(params.rubricId, 10));
    const condition = rubrics && rubrics.length !== 0;
    return <div>
      {condition
        && rubrics.map((rubric, i) =>
          <RaisedButton key={i} label={rubric.name} fullWidth={true} onTouchTap={() => browserHistory.push(rubric.url)} />
        )
        || <AdList />
      }
    </div>;
  }
}

