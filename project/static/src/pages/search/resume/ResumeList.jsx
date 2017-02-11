import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import ResumeDialog from './ResumeDialog';


const ResumeCard = ({worker, onRequest}) => <div><div className="flex items-center">
    <div className="w-20">
      <span>{`${worker.firstname} ${worker.lastname}`}</span>
    </div>
    <div className="w-50 pv3">
      {worker.resume.text.split(' ').slice(0, 20).join(' ')}
    </div>
    <div className="w-30">
      <RaisedButton
        label="Откликнуться"
        primary={true}
        onTouchTap={() => onRequest(worker)}
      />
      <FlatButton
        label="Подробнее"
        onTouchTap={() => browserHistory.push(worker.absoluteUrl)}
      />
    </div>
  </div>
  <Divider />
</div>;

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

  render() {
    const { store, workers } = this.props;
    return <div className="">
      {workers.length &&
        workers.map((worker, key) => {
          return <ResumeCard
            key={key}
            worker={worker}
            onRequest={this._handleOnRequest}
          />;
        }) ||
        <h1>Нет доступных резюме</h1>
      }
      <ResumeDialog
        vacancy={this.vacancy}
        store={store}
        workerId={this.workerId}
        open={this.open}
        onClose={this.handleOnClose}/>
    </div>;
  }
}

