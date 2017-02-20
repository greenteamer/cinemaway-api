import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';
import styles from '../styles';
import RentDialog from './RentForm';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import { observable } from 'mobx';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
// import { Modal, ModalManager, Effect } from '../../../components/dialog';


@inject('store', 'uiStore') @observer
export default class Vacancies extends Component {

  @observable dialog = {
    show: false,
    delete: false,
  };
  @observable tmpRent = initialRent;

  static propTypes = {
    store: React.PropTypes.object,
    rents: React.PropTypes.object,
    uiStore: React.PropTypes.object,
    ActionButton: React.PropTypes.func,
  }

  _handleEditRent = (rent) => {
    this.dialog.show = true;
    this.tmpRent = rent;
  }

  _handleDeleteRent(id) {
    this.dialog.delete = true;
    this.tmpRent.id = id;
  }


  render() {
    const { store, rents } = this.props;
    const { user } = store;
    if (!user) {
      return <div>no user</div>;
    }
    return <div style={styles.fields}>
      <h1>Ваши позиции добавленные в аренду</h1>
      <Table
        selectable={false}
      >
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>Отклики</TableHeaderColumn>
            <TableHeaderColumn>Название позиции</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {rents.length &&
            rents.map((rent, key) => <TableRow key={key}>
              <TableRowColumn>
                {rent.inputRequests.length !== 0 &&
                  <FlatButton
                    label={rent.inputRequests.length}
                    primary={true}
                    onTouchTap={() => browserHistory.push(rent.profileUrl)}
                  />
                }
              </TableRowColumn>
              <TableRowColumn>
                <Link to={rent.profileUrl}>{rent.name}</Link>
              </TableRowColumn>
              <TableRowColumn>
                <IconButton
                  iconClassName="ion-edit"
                  onTouchTap={() => this._handleEditRent(rent)}
                />
                <IconButton
                  iconClassName="ion-trash-b"
                  onTouchTap={() => this._handleDeleteRent(rent.id)}
                />
              </TableRowColumn>
            </TableRow>)
          }
        </TableBody>
      </Table>
      <RentDialog
        ref='dialog'
        dialog={this.dialog}
        rent={this.tmpRent}
      />
      <Dialog
        ref="dialog"
        title="Удалить аренду"
        actions={[
          <FlatButton
            label="Отмена"
            primary={true}
            onTouchTap={() => { this.dialog.delete = false; }}
          />,
          <RaisedButton
            label="Удалить"
            primary={true}
            onTouchTap={() => {
              store.deleteRent(this.tmpRent.id);
              this.dialog.delete = false;
            }}
          />,
        ]}
        modal={true}
        open={this.dialog.delete}
        autoScrollBodyContent={true}
      >
        <p>Вы уверены что хотите удалить позицию аренды?</p>
      </Dialog>
    </div>;
  }
}


const initialRent = {
  name: '',
  description: '',
  owner: null,
  image: null,
  imageFile: null,
};
