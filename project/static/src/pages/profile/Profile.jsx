import React from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
// import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {CardHeader, CardTitle } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
// import RaisedButton from 'material-ui/RaisedButton';
// import TableRequests from '../../components/requests/TableRequests';
import styles from './styles';
import ProfileForm from './ProfileForm';
import ResumeForm from './ResumeForm';
import { UIStore } from '../../stores';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import UIDialog from '../../components/uidialog';


@inject('store') @observer
export default class Profile extends React.Component {

  static propTypes = {
    store: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleSuccess = (reqId, newMessage) => {
    console.log('on success request id: ', reqId);
    const { store } = this.props;
    store.addUserResponse(store.user.id, reqId, true, newMessage);
  }

  render() {
    const { store } = this.props;
    if (UIStore.isLoading || !store.user) {
      return null;
    }
    const userRequests = observable(
      store.user.inputRequests
        .filter(r => !!r.vacancyObj)
    );

    return <div style={styles.card}>

      <CardHeader>
        <CardTitle title="Ваш профиль" subtitle="Введите данные в поля ниже" />
      </CardHeader>

      <div className="flex">
        <Paper zDepth={1} rounded={false}  style={styles.form}>
          <ProfileForm />
        </Paper>
      </div>
      <Paper zDepth={1} rounded={false} className="mt4">
        <div className="pa3">
          <h3>
            Отправленные Вам предложения
          </h3>
          <InputRequests
            requests={userRequests}
            columnName="Вакансия"
            getLinkFunc={(req) => <Link to={ req.vacancyObj.absoluteUrl }>{ req.vacancyObj.name }</Link>}
            onSuccess={this.handleSuccess}
          />
        </div>
      </Paper>
      <Paper zDepth={1} rounded={false} className="mt4">
        <ResumeForm />
      </Paper>

    </div>;
  }
}


@inject('store') @observer
export class InputRequests extends React.Component {
  static propTypes = {
    store: React.PropTypes.object,
    requests: React.PropTypes.object,
  }

  @observable dialog = false;
  @observable text = '';
  @observable requestId = null;
  @observable tmpMessage = '';
  @observable messageDialog = false;

  _handleOpenDialog = (requestId) => {
    this.requestId = requestId;
    this.dialog = true;
  }

  _handleOnCancel = () => {
    this.dialog = false;
  }

  _handleOnSave = () => {
    const { store } = this.props;
    store.addUserResponse(store.user.id, this.requestId, true, this.text);
    this.dialog = false;
  }

  _handleOnReject = () => {
    const { store } = this.props;
    store.addUserResponse(store.user.id, this.requestId, false, this.text);
    this.dialog = false;
  }

  _handleShowMessage = (message) => {
    this.tmpMessage = message;
    this.messageDialog = true;
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
            <TableHeaderColumn>Статус</TableHeaderColumn>
            <TableHeaderColumn>Пользователь</TableHeaderColumn>
            <TableHeaderColumn>Сообщение запроса</TableHeaderColumn>
            <TableHeaderColumn>Сообщение ответа</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {requests &&
            requests.map( (req, index) => <TableRow key={index}>
              <TableRowColumn>
                { req.userResponse ? req.userResponse.status ? 'Согласие' : 'Отказ' :  'В ожидании' }
              </TableRowColumn>
              <TableRowColumn>
                <Link to={req.resumeUserObj.absoluteUrl}>
                  { req.resumeUserObj.fullName }
                </Link>
              </TableRowColumn>
              <TableRowColumn>
                {req.text &&
                  <FlatButton
                    label="Прочитать"
                    primary={true}
                    onTouchTap={() => this._handleShowMessage(req.text)}
                  />
                }
              </TableRowColumn>
              <TableRowColumn>
                {req.userResponse &&
                  <FlatButton
                    label="Прочитать"
                    primary={true}
                    onTouchTap={() => this._handleShowMessage(req.userResponse.text)}
                  />
                }
              </TableRowColumn>
              <TableRowColumn>
                <FlatButton
                  label="Ответить"
                  primary={true}
                  onTouchTap={() => this._handleOpenDialog(req.id)}
                />
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <UIDialog
        dialog={this.dialog}
        title="Дать согласие"
        onCancel={this._handleOnCancel}
        onSubmit={this._handleOnSave}
        actions={[
          <FlatButton
            label="Отмена"
            primary={true}
            onTouchTap={this._handleOnCancel}
          />,
          <FlatButton
            label="Дать согласие"
            primary={true}
            onTouchTap={this._handleOnSave}
          />,
          <FlatButton
            label="Отказать"
            secondary={true}
            onTouchTap={this._handleOnReject}
          />,
        ]}>
        {
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <TextField
                hintText="Сообщение"
                floatingLabelText="Сообщение"
                defaultValue={this.text}
                multiLine={true}
                rows={3}
                onChange={(e) => { this.text = e.target.value; }}
              />
            </div>
        </div>
        }
      </UIDialog>
      <Dialog
        title="Сообщение"
        modal={false}
        open={this.messageDialog}
        onRequestClose={() => { this.messageDialog = false; }}
        actions={[
          <FlatButton
            label="Закрыть"
            primary={true}
            onTouchTap={() => { this.messageDialog = false; }}
          />,
        ]}>
        {this.tmpMessage}
      </Dialog>
    </div>;
  }
}

