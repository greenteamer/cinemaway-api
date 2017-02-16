import React from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import { Modal, ModalManager, Effect } from '../../../components/dialog';
import Status from '../../../components/status';
// import TextField from 'material-ui/TextField';
// import Toggle from 'material-ui/Toggle';


@inject('store') @observer
export class InputRequests extends React.Component {
  static propTypes = {
    store: React.PropTypes.object,
    requests: React.PropTypes.object,
  }

  _handleDeleteRequest = (id) => {
    const { store } = this.props;
    ModalManager.open(<Modal
      effect={Effect.Newspaper}
      onRequestClose={() => true}>
      <div style={{ padding: 10 }}>
        <h2>Удалить предложение?</h2>
        <div style={{ float: 'right', padding: 10 }}>
          <FlatButton
            label="Закрыть"
            primary={true}
            onTouchTap={ModalManager.close}
          />
          <FlatButton
            label="Удалить"
            primary={true}
            onTouchTap={() => {
              store.deleteRequest(id);
              ModalManager.close();
            }}
          />
        </div>
      </div>
    </Modal>);
  }

  render() {
    const { store, requests } = this.props;
    if (!store.user) return null;
    return <div>
      <Table
        selectable={false}
      >
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>Отправленные предложения</TableHeaderColumn>
            <TableHeaderColumn>Вакансия</TableHeaderColumn>
            <TableHeaderColumn>Резюме</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {requests &&
            requests.map( (req, index) => <TableRow key={index}>
              <TableRowColumn><Status user={store.user} req={req} /></TableRowColumn>
              <TableRowColumn>{req.vacancyObj ? req.vacancyObj.name : ''}</TableRowColumn>
              <TableRowColumn>{req.objectObj ? req.objectObj.firstname : ''}</TableRowColumn>
              <TableRowColumn>
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>;
  }
}


@inject('store') @observer
export class OutputRequests extends React.Component {

  @observable tmpObj = { text: '' };

  static propTypes = {
    store: React.PropTypes.object,
    requests: React.PropTypes.object,
  }

  _handleDeleteRequest = (id) => {
    const { store } = this.props;
    ModalManager.open(<Modal
      effect={Effect.Newspaper}
      onRequestClose={() => true}>
      <div style={{ padding: 10 }}>
        <h2>Удалить предложение?</h2>
        <div style={{ float: 'right', padding: 10 }}>
          <FlatButton
            label="Закрыть"
            primary={true}
            onTouchTap={ModalManager.close}
          />
          <FlatButton
            label="Удалить"
            primary={true}
            onTouchTap={() => {
              store.deleteRequest(id);
              ModalManager.close();
            }}
          />
        </div>
      </div>
    </Modal>);
  }

  handleChangeText = (e, value) => {
    this.tmpObj.text = value;
  }

  _handleAddResponse = (requestId) => {
    const { store } = this.props;
    const self = this;
    ModalManager.open(<Modal
      effect={Effect.Newspaper}
      onRequestClose={() => true}>
      <div style={{ padding: 10 }}>
        <h2>Согласиться на предложение</h2>
        <TextField
          hintText="Ваш комментарий"
          floatingLabelText="Ваш комментарий"
          multiLine={true}
          rows={2}
          onChange={self.handleChangeText}
        />
        <div style={{ float: 'right', padding: 10 }}>
          <FlatButton
            label="Отказать"
            primary={true}
            onTouchTap={() => {
              store.addUserResponse(store.user.id, requestId, false, self.tmpObj.text);
              ModalManager.close();
            }}
          />
          <FlatButton
            label="Согласиться"
            primary={true}
            onTouchTap={() => {
              store.addUserResponse(store.user.id, requestId, true, self.tmpObj.text);
              ModalManager.close();
            }}
          />
        </div>
      </div>
    </Modal>);
  }

  render() {
    const { store, requests } = this.props;
    if (!store.user) return null;
    return <div>
      <Table
        selectable={false}
      >
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>Полученные предложения</TableHeaderColumn>
            <TableHeaderColumn>Вакансия</TableHeaderColumn>
            {!store.user.isWorker &&
              <TableHeaderColumn>Резюме</TableHeaderColumn>
            }
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {requests &&
            requests.map( (req, index) => <TableRow key={index}>
              <TableRowColumn><Status user={store.user} req={req} isInvites/></TableRowColumn>
              <TableRowColumn>{req.vacancyObj ? req.vacancyObj.name : ''}</TableRowColumn>
              {!store.user.isWorker &&
                <TableRowColumn>{req.objectObj ? req.ownerObj.firstname : ''}</TableRowColumn>
              }
              <TableRowColumn>
                <IconButton
                  iconClassName="ion-compose"
                  onTouchTap={() => this._handleAddResponse(req.id)}
                />
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>;
  }
}


@inject('store') @observer
export default class RequestList extends React.Component {

  static propTypes = {
    store: React.PropTypes.object,
  }

  render() {
    const { store } = this.props;
    if (!store.user) return null;
    return <div>
      <InputRequests requests={store.user.inputRequests}/>
      <br />
      <OutputRequests requests={store.user.outputRequests}/>
    </div>;
  }
}
