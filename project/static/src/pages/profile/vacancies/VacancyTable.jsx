import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
// import TextField from 'material-ui/TextField';
// import Divider from 'material-ui/Divider';
// import Checkbox from 'material-ui/Checkbox';
// import RaisedButton from 'material-ui/RaisedButton';
// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
// import { SimpleDialog } from '../../../components/dialog';
import styles from '../styles';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


@inject('store', 'uiStore') @observer
export default class Vacancies extends Component {
  static propTypes = {
    store: React.PropTypes.object,
    uiStore: React.PropTypes.object,
    ActionButton: React.PropTypes.func,
  }

  _handleAddVacancy = () => {
    console.log('handle add vacancy');
  }

  _handleOnCheck = (e, value) => {
    console.log('_handleOnCheck start value:', value);
  }

  render() {
    const { store: { user, vacancies } } = this.props;
    if (!user) {
      return <div>no user</div>;
    }
    return <div style={styles.fields}>
      <h4>Выберите рубрики</h4>
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
          {vacancies.length &&
            vacancies.map((v, key) => <TableRow key={key}>
              <TableRowColumn>{v.id}</TableRowColumn>
              <TableRowColumn>{v.name}</TableRowColumn>
              <TableRowColumn>{v.status}</TableRowColumn>
              <TableRowColumn>{v.status}</TableRowColumn>
            </TableRow>)
          }
        </TableBody>
      </Table>
    </div>;
  }
}
