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
    const { store: { user }, rents } = this.props;
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
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
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
