import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
// import TextField from 'material-ui/TextField';
// import Divider from 'material-ui/Divider';
// import Checkbox from 'material-ui/Checkbox';
// import RaisedButton from 'material-ui/RaisedButton';
// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
// import { SimpleDialog } from '../../../components/dialog';
import VacancyForm from './VacancyForm';
import VacancyTable from './VacancyTable';
import styles from '../styles';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


@inject('store', 'uiStore') @observer
export default class Vacancies extends Component {

  @observable tmpVacancy = initialVacancy;

  static propTypes = {
    store: React.PropTypes.object,
    uiStore: React.PropTypes.object,
  }

  _handleSaveVacancy = () => {
    const { store, uiStore } = this.props;
    this.tmpVacancy.owner = store.user.id;
    store.addVacancy(toJS(this.tmpVacancy));
    this.tmpVacancy = {
      name: '',
      description: '',
      rubrics: [],
      owner: null,
    };
    uiStore.closeDialog();
  }

  _handleCancelVacancy = () => {
    const { uiStore } = this.props;
    uiStore.closeDialog();
  }

  _handleAddVacancy = () => {
    console.log('handle add vacancy');
    // const { store, uiStore } = this.props;
    const { uiStore } = this.props;
    uiStore.openDialog();
  }

  _handleOnCheck = (e, value) => {
    console.log('_handleOnCheck start value:', value);
  }

  render() {
    const { store: { user }, uiStore } = this.props;
    console.log('start render Vacancies');
    if (!user) {
      return <div>no user</div>;
    }
    // const saveVacancyButton = () => <RaisedButton
    //   label="Добавить Вакансию"
    //   primary={true}
    //   fullWidth={false}
    //   onTouchTap={this._handleAddVacancy}
    // />;
    const dialogActions = [
      <FlatButton
        label="Отмена"
        primary={true}
        onTouchTap={this._handleCancelVacancy}
      />,
      <FlatButton
        label="Сохранить"
        primary={true}
        onTouchTap={this._handleSaveVacancy}
      />,
    ];
    console.log('Vacancies render tmpVacancy:', toJS( this.tmpVacancy ));
    return <div style={{height: '100%'}}>
      <VacancyTable />
      <Dialog
        title="Вакансия"
        actions={dialogActions}
        modal={true}
        open={uiStore.dialog}
        autoScrollBodyContent={true}
      >
        <VacancyForm
          vacancy={this.tmpVacancy}
        />
      </Dialog>
      <FloatingActionButton
        style={styles.floatingButton}
        onTouchTap={this._handleAddVacancy}
      >
        <ContentAdd />
      </FloatingActionButton>
    </div>;
  }
}

const initialVacancy = {
  name: '',
  description: '',
  rubrics: [],
  owner: null,
};
