import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
// import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import ResumeDialog from './ResumeDialog';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';


const ResumeCard = ({worker, onRequest}) => <Card>
  <CardHeader
    title={`${worker.firstname} ${worker.lastname}`}
    avatar={<IconButton style={{ width: '50', height: '50px', margin: '4px', padding: '0px', overflow: 'hidden', borderRadius: '25px' }}>
      <img src={worker.avatar} />
    </IconButton>}
    actAsExpander={true}
    showExpandableButton={true}
  />
  <CardActions>
    <RaisedButton
      label="Откликнуться"
      primary={true}
      onTouchTap={() => onRequest(worker)}
    />
    <FlatButton
      label="Подробнее"
      onTouchTap={() => browserHistory.push(worker.absoluteUrl)}
    />
  </CardActions>
  <CardText expandable={true}>
    {worker.resume.text.split(' ').slice(0, 20).join(' ')}
  </CardText>
</Card>;

ResumeCard.propTypes = {
  worker: React.PropTypes.object,
  onRequest: React.PropTypes.func,
};


@inject('store') @observer
export default class ResumeList extends React.Component {

  @observable open = false;
  @observable tmpObj = { text: '' };
  @observable vacancy = { id: null };
  @observable workerId = null;
  @observable rubricFilter = null;

  static propTypes = {
    store: React.PropTypes.object,
    workers: React.PropTypes.object,
  }

  handleChangeText = (e, value) => {
    this.tmpObj.text = value;
  }

  handleSelectVacancy = (e) => {
    console.log('handleSelectRubric value: ', e.target.value);
    this.vacancy.id = parseInt(e.target.value, 10);
  }

  handleOnClose = () => {
    this.open = false;
  }

  _handleOnRequest = (worker) => {
    this.open = true;
    this.workerId = worker.id;
  }

  handleFilter = (e) => {
    this.rubricFilter = e;
  }

  render() {
    const { store, workers } = this.props;
    const filteredWorkers = this.rubricFilter
      ? workers.filter(w => w.resume.rubrics.includes(this.rubricFilter))
      : workers;
    return <div className="flex">
      <Paper style={{
        display: 'inline-block',
        margin: '16px 32px 16px 2px',
        width: '30%',
      }}>
        <h5 className="pa3">Рубрики: </h5>
        <List>
          <ListItem
            primaryText="Показать все"
            onTouchTap={() => { this.rubricFilter = null; }}
            style={{}}
          />
          {store.rubrics.length !== 0 &&
              store.rubrics.map(( r, index ) => <ListItem
                key={index}
                value={r.id}
                primaryText={r.name}
                onTouchTap={() => this.handleFilter(r.id)}
                style={{}}
              />)
          }
        </List>
      </Paper>
      <div className="mt3 mr1 w-100">
        {filteredWorkers.length &&
            filteredWorkers.map((worker, key) => {
              return <ResumeCard
                key={key}
                worker={worker}
                onRequest={this._handleOnRequest}
              />;
            }) ||
            <h1>Нет доступных резюме</h1>
        }
      </div>
      <ResumeDialog
        vacancy={this.vacancy}
        store={store}
        workerId={this.workerId}
        open={this.open}
        onClose={this.handleOnClose}/>
    </div>;
  }
}

