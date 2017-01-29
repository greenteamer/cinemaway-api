import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
// import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
// import RaisedButton from 'material-ui/RaisedButton';
// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
// import { SimpleDialog } from '../../../components/dialog';
import styles from '../styles';


@inject('store') @observer
export default class Vacancies extends Component {
  // static propTypes = {
  //   uiStore: React.PropTypes.object,
  //   ActionButton: React.PropTypes.func,
  // }
  static propTypes = {
    vacancy: React.PropTypes.object,
    store: React.PropTypes.object,
  }

  _handleAddVacancy = () => {
    console.log('handle add vacancy');
  }

  _handleOnCheck = (e, value) => {
    console.log('_handleOnCheck start value:', value);
    console.log('_handleOnCheck start e:', e.target.value);
    const { vacancy } = this.props;
    if (value) {
      vacancy.rubrics.push(parseInt(e.target.value, 10));
    }
    else {
      vacancy.rubrics.remove(parseInt(e.target.value, 10));
    }
  }

  render() {
    // const { store: { user, rubrics } } = this.props;
    const { vacancy, store } = this.props;
    // console.log('VacancyForm vacancy:', vacancy);
    return <div style={styles.fields}>

      <TextField
        hintText="Заголовок"
        floatingLabelText="Заголовок"
        value={vacancy.name}
        onChange={(e) => { vacancy.name = e.target.value; }}
      />
      <br />
      <TextField
        hintText="Описание"
        floatingLabelText="Описание вакансии"
        multiLine={true}
        rows={3}
        value={vacancy.description}
        onChange={(e) => { vacancy.description = e.target.value; }}
      />

      <h4>Выберите рубрики</h4>

      {store.rubrics.length &&
        store.rubrics.map(( r, key ) =>
          <Checkbox
            key={key}
            label={r.name}
            checked={vacancy.rubrics.includes(r.id)}
            onCheck={this._handleOnCheck}
            value={r.id}
          />
        )
      }
    </div>;
  }
}
