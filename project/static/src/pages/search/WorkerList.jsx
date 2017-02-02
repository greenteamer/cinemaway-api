import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Modal, ModalManager, Effect } from '../../components/dialog';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';


const WorkerCard = ({worker, onRequest}) => <Card>
  <CardHeader
    title={worker.firstname}
    subtitle="Subtitle"
    actAsExpander={true}
    showExpandableButton={true}
  />
  <CardActions>
    <FlatButton
      label="Откликнуться"
      onTouchTap={() => onRequest(worker)}
    />
  </CardActions>
  <CardText expandable={true}>
    {worker.description}
  </CardText>
</Card>;

WorkerCard.propTypes = {
  worker: React.PropTypes.object,
  onRequest: React.PropTypes.func,
};


@inject('store') @observer
export default class WorkerList extends React.Component {

  @observable tmpObj = { text: '' };
  @observable vacancy = { id: null };

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

  _handleOnRequest = (worker) => {
    console.log('_handleOnRequest vacancy: ', worker);
    const { store } = this.props;
    const self = this;
    ModalManager.open(<Modal
      effect={Effect.Newspaper}
      onRequestClose={() => true}>
      <div style={{ padding: 10 }}>
        <h2>Ваш комментарий</h2>
        <select onChange={self.handleSelectVacancy}>
          {store.user &&
              store.user.vacancies.map(( v, index ) => <option key={index} value={v.id}>{v.name}</option>)
          }
        </select>
        <TextField
          hintText="Ваш комментарий"
          floatingLabelText="Ваш комментарий"
          multiLine={true}
          rows={2}
          onChange={self.handleChangeText}
        />
        <div style={{ float: 'right', padding: 10 }}>
          <FlatButton
            label="Отмена"
            primary={true}
            onTouchTap={ModalManager.close}
          />
          <FlatButton
            label="Отправить"
            primary={true}
            onTouchTap={() => {
              store.addUserRequest(store.user.id, self.vacancy.id, worker.id, self.tmpObj.text);
              ModalManager.close();
            }}
          />
        </div>
      </div>
    </Modal>);
  }

  render() {
    const { workers } = this.props;
    return <div>
      {workers.length &&
        workers.map((worker, key) => {
          return <WorkerCard
            key={key}
            worker={worker}
            onRequest={this._handleOnRequest}
          />;
        }) ||
        <h1>Нет доступных резюме</h1>
      }
    </div>;
  }
}
