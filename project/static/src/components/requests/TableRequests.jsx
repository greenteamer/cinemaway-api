import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';


@observer
export default class TableRequests extends React.Component {
  @observable dialog = {
    show: false,
  };
  @observable tmpMessage = '';
  @observable tmpNewMessage = '';
  @observable tmpRequestId = null;

  static propTypes = {
    store: React.PropTypes.object,
    requests: React.PropTypes.object,
    columnName: React.PropTypes.string,
    getLinkFunc: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
  }

  _handleFieldChange = (e, value) => {
    this.tmpNewMessage = value;
  }

  render() {
    const { requests, columnName, getLinkFunc, onSuccess } = this.props;
    return <div>
      <Table
        selectable={false}
      >
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn></TableHeaderColumn>
            <TableHeaderColumn>{ columnName }</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {requests &&
            requests.map( (req, index) => <TableRow key={index}>
              <TableRowColumn>
                {req.text &&
                  <FlatButton
                    label="Сообщение"
                    primary={true}
                    onTouchTap={() => {
                      this.dialog.show = true;
                      this.tmpMesage = req.text;
                      this.tmpRequestId = req.id;
                    }}
                  />
                }
              </TableRowColumn>
              <TableRowColumn>
                {getLinkFunc(req)}
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog
        ref="dialog"
        title="Ответ"
        actions={[
          <FlatButton
            label="Закрыть"
            primary={true}
            onTouchTap={() => { this.dialog.show = false; }}
          />,
          onSuccess ?
            <RaisedButton
              label="Согласиться"
              primary={true}
              onTouchTap={() => {
                this.dialog.show = false;
                onSuccess(this.tmpRequestId, this.tmpNewMessage);
              }}
            /> : null,
        ]}
        modal={true}
        open={this.dialog.show}
        autoScrollBodyContent={true}
      >
        <div>
          <p>{this.tmpMesage}</p>
          {onSuccess &&
            <div>
              <h4>Ваш ответ</h4>
              <TextField
                name="text"
                multiLine={true}
                rows={3}
                fullWidth={true}
                onChange={this._handleFieldChange}
                floatingLabelText="Напишите Ваш ответ" />
            </div>
          }
        </div>
      </Dialog>
    </div>;
  }
}
