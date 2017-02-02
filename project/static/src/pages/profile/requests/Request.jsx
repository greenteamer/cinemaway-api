import React from 'react';
import { inject, observer } from 'mobx-react';
import IconButton from 'material-ui/IconButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import { Modal, ModalManager, Effect } from '../../../components/dialog';
// import TextField from 'material-ui/TextField';
// import Toggle from 'material-ui/Toggle';


@inject('store') @observer
export default class TableExampleComplex extends React.Component {

  static propTypes = {
    store: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
    };
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

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
    const { store } = this.props;
    if (!store.user) return null;
    return <div>
      <Table
        height={this.state.height}
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
        selectable={false}
      >
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>Приглашения</TableHeaderColumn>
            <TableHeaderColumn>Вакансия</TableHeaderColumn>
            {!store.user.isWorker &&
              <TableHeaderColumn>Резюме</TableHeaderColumn>
            }
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover={this.state.showRowHover}
          stripedRows={this.state.stripedRows}
          displayRowCheckbox={false}
        >
          {store.user &&
            store.user.requests.map( (req, index) => <TableRow key={index}>
            <TableRowColumn>Приглашение</TableRowColumn>
            <TableRowColumn>{req.vacancyObj ? req.vacancyObj.name : ''}</TableRowColumn>
            {!store.user.isWorker &&
              <TableRowColumn>{req.objectObj ? req.objectObj.firstname : ''}</TableRowColumn>
            }
            <TableRowColumn>
              <IconButton
                iconClassName="ion-trash-b"
                onTouchTap={() => this._handleDeleteRequest(req.id)}
              />
            </TableRowColumn>
          </TableRow>
          )}
        </TableBody>
      </Table>
    </div>;
  }
}
