import React, { Component } from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import styles from '../styles';
import VacancyDialog from './VacancyForm';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import { observable } from 'mobx';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { browserHistory } from 'react-router';
// import { Modal, ModalManager, Effect } from '../../../components/dialog';


@inject('store', 'uiStore') @observer
export default class Vacancies extends Component {

  @observable dialog = {
    show: false,
    delete: false,
  };
  @observable tmpVacancy = initialVacancy;

  static propTypes = {
    store: React.PropTypes.object,
    vacancies: React.PropTypes.object,
    uiStore: React.PropTypes.object,
    ActionButton: React.PropTypes.func,
  }

  _handleEditVacancy = (vacancy) => {
    this.dialog.show = true;
    this.tmpVacancy = vacancy;
  }

  _handleDeleteVacancy(id) {
    this.dialog.delete = true;
    this.tmpVacancy.id = id;
  }


  render() {
    const { store, vacancies } = this.props;
    // if (!store.user) {
    //   return <div>no user</div>;
    // }
    console.log('VacancyTable render');
    return <div style={styles.fields}>
      <h1>Ваши ваканисии</h1>
      <Table
        selectable={false}
      >
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>Отклики</TableHeaderColumn>
            <TableHeaderColumn>Вакансия</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {vacancies.length &&
            vacancies.map((v, key) => <TableRow key={key}>
              <TableRowColumn>
                {v.inputRequests.length !== 0 &&
                  <FlatButton
                    label={v.inputRequests.length}
                    primary={true}
                    onTouchTap={() => browserHistory.push(v.profileUrl)}
                  />
                }
              </TableRowColumn>
              <TableRowColumn>
                <Link to={v.profileUrl}>{v.name}</Link>
              </TableRowColumn>
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
      <VacancyDialog
        ref='dialog'
        dialog={this.dialog}
        vacancy={this.tmpVacancy}
      />
      <Dialog
        ref="dialog"
        title="Удалить вакансию"
        actions={[
          <FlatButton
            label="Отмена"
            primary={true}
            onTouchTap={() => { this.dialog.delete = false; }}
          />,
          <RaisedButton
            label="Удалить"
            secondary={true}
            onTouchTap={() => {
              store.deleteVacancy(this.tmpVacancy.id);
              this.dialog.delete = false;
            }}
          />,
        ]}
        modal={true}
        open={this.dialog.delete}
        autoScrollBodyContent={true}
      >
        <p>Вы уверены что хотите удалить вакансию?</p>
      </Dialog>
    </div>;
  }
}


const initialVacancy = {
  name: '',
  description: '',
  rubrics: [],
  owner: null,
};
