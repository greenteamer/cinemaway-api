import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styles from '../styles';
import RentDialog from './RentForm';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import { observable } from 'mobx';
import FlatButton from 'material-ui/FlatButton';
import { Modal, ModalManager, Effect } from '../../../components/dialog';


@inject('store', 'uiStore') @observer
export default class Vacancies extends Component {

  @observable dialog = {
    show: false,
    delete: false,
  };
  @observable tmpVacancy = initialVacancy;

  static propTypes = {
    store: React.PropTypes.object,
    rents: React.PropTypes.object,
    uiStore: React.PropTypes.object,
    ActionButton: React.PropTypes.func,
  }

  _handleEditVacancy = (vacancy) => {
    this.dialog.show = true;
    this.tmpVacancy = vacancy;
  }

  _handleDeleteVacancy(id) {
    const { store } = this.props;
    ModalManager.open(<Modal
      effect={Effect.Newspaper}
      onRequestClose={() => true}>
      <div style={{ padding: 10 }}>
        <h2>Удалить вакансию ?</h2>
        <div style={{ float: 'right', padding: 10 }}>
          <FlatButton
            label="Закрыть"
            primary={true}
            onTouchTap={ModalManager.close}
          />
          <FlatButton
            label="Удалить"
            primary={true}
            onTouchTap={() => store.deleteVacancy(id)}
          />
        </div>
      </div>
    </Modal>);
  }


  render() {
    const { store: { user }, rents } = this.props;
    if (!user) {
      return <div>no user</div>;
    }
    return <div style={styles.fields}>
      <h1>Ваши позиции добавленные в аренду</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rents.length &&
            rents.map((v, key) => <TableRow key={key}>
              <TableRowColumn>{v.id}</TableRowColumn>
              <TableRowColumn>{v.name}</TableRowColumn>
              <TableRowColumn>{v.status}</TableRowColumn>
              <TableRowColumn>
                <IconButton
                  iconClassName="ion-edit"
                  onTouchTap={() => this._handleEditVacancy(v)}
                />
                <IconButton
                  iconClassName="ion-trash-b"
                  onTouchTap={() => this._handleDeleteVacancy(v.id)}
                />
              </TableRowColumn>
            </TableRow>)
          }
        </TableBody>
      </Table>
      <RentDialog
        ref='dialog'
        dialog={this.dialog}
        vacancy={this.tmpVacancy}
      />
    </div>;
  }
}


const initialVacancy = {
  name: '',
  description: '',
  rubrics: [],
  owner: null,
};
