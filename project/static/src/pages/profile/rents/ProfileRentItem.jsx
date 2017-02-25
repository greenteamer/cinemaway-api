import React from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import FlatButton from 'material-ui/FlatButton';
// import RequestDialog from './RequestDialog';
import UIDialog from '../../../components/uidialog';
// import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';


@inject('store') @observer
class RentCard extends React.Component {
  static propTypes = {
    store: React.PropTypes.object,
    params: React.PropTypes.object,
    onRequest: React.PropTypes.func,
  }

  @observable open = false;

  onRequest = () => {
    this.open = true;
  }

  render() {
    const { store, params } = this.props;
    const id = parseInt(params.rentId, 10);
    const rent = store.rents.find(rent => rent.id === id);
    if (!rent) return null;
    console.log('rent : ', rent);
    return <div>
      <Card>
        <CardHeader
          title={rent.name}
          subtitle="Subtitle"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
        </CardActions>
        <CardText expandable={true}>
          {rent.description}
        </CardText>
      </Card>
      <h3 className="mv3">Отклики на эту позицию аренды</h3>
      <InputRequests requests={rent.inputRequests}/>
    </div>;
  }
}

export default RentCard;


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
                <Link to={req.renterUserObj.absoluteUrl}>
                  { req.renterUserObj.fullName }
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

