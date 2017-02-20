import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import VacancyForm from './VacancyForm';
import VacancyTable from './VacancyTable';
import styles from '../styles';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
// import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';


@inject('store', 'uiStore') @observer
export default class Vacancies extends Component {

  @observable tmpVacancy = initialVacancy;
  @observable dialog = { show: false };

  static propTypes = {
    store: React.PropTypes.object,
    uiStore: React.PropTypes.object,
  }

  handleOnSubmit = () => {
    const { store } = this.props;
    this.tmpVacancy.owner = store.user.id;
    store.addVacancy(toJS(this.tmpVacancy));
    this.tmpVacancy = {
      name: '',
      description: '',
      rubrics: [],
      owner: null,
    };
    this.dialog.show = false;
  }

  render() {
    const { store: { user } } = this.props;
    if (!user) {
      return <div>no user</div>;
    }
    return <div style={{height: '100%'}}>
      <VacancyTable vacancies={user.vacancies} />
      <VacancyForm
        dialog={this.dialog}
        vacancy={this.tmpVacancy}
        onSubmit={this.handleOnSubmit}
      />
      <RaisedButton
        label="Добавить вакансию"
        primary={true}
        onTouchTap={() => { this.dialog.show = true; }}
        style={{ float: 'right' }}
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
