import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
// import { observable } from 'mobx';
import TextField from 'material-ui/TextField';
// import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
// import { SimpleDialog } from '../../components/dialog';
// import { SimpleDialog } from '../../components/dialog';
import styles from './styles';
// import FlatButton from 'material-ui/FlatButton';
// import { Modal, ModalManager, Effect } from '../../components/dialog';
import Toggle from 'material-ui/Toggle';
import Geosuggest from 'react-geosuggest';


@inject('store', 'uiStore') @observer
export default class ResumeForm extends Component {

  tmpResume = {};
  // @observable open = false;

  static propTypes = {
    store: React.PropTypes.object,
    open: React.PropTypes.bool,
    uiStore: React.PropTypes.object,
  }

  _handleSaveResume = () => {
    const { store: { user } } = this.props;
    user.resume.save();
  }

  // _handleOnPopulateProfile = () => {
  //   this.open = true;
  //   const { store } = this.props;
  //   if (!store.user.resume) {
  //     store.addResume();
  //   }
  // }

  _handleRubricOnCheck = (e) => {
    const { store } = this.props;
    const id = parseInt(e.target.value, 10);
    store.user.resume.toggleRubric(id);
  }

  _handleFieldChange = (e, value) => {
    const { store: { user } } = this.props;
    user.resume[e.target.name] = value;
  }

  onSuggestSelect = (suggest) => {
    const { store: { user } } = this.props;
    user.resume.city = suggest.label;
  }

  handleCustomCity = (value) => {
    const { store: { user } } = this.props;
    user.resume.city = value;
  }

  render() {
    const { store: { user, rubrics }, open } = this.props;
    if (!user) {
      return null;
    }
    const { resume } = user;
    const isOpen = open && resume;
    return <div style={styles.fields}>

      {isOpen &&
        <div>
          <h3>Заполните резюме</h3>

          <Toggle
            label={resume.isActive ? 'Скрыть резюме' : 'Сделать резюме видимым'}
            onToggle={() => { resume.isActive = !resume.isActive; }}
            toggled={resume.isActive}
            style={styles.toggle}
          />
          <Toggle
            label={resume.isActive ? 'Скрыть телефон' : 'Сделать телефон видимым'}
            onToggle={() => { resume.phoneIsActive = !resume.phoneIsActive; }}
            toggled={resume.phoneIsActive}
            style={styles.toggle}
          />

          <Geosuggest
            placeholder="Ваш город"
            initialValue={resume.city}
            onBlur={this.handleCustomCity}
            onSuggestSelect={this.onSuggestSelect}
          />

          <TextField
            type="text"
            name="phone"
            value={resume.phone ? resume.phone : ''}
            fullWidth={true}
            onChange={this._handleFieldChange}
            floatingLabelText="Телефон" />

          <TextField
            type="text"
            name="edu"
            value={resume.edu ? resume.edu : ''}
            fullWidth={true}
            multiLine={true}
            rows={3}
            onChange={this._handleFieldChange}
            floatingLabelText="Образование" />

          <TextField
            type="text"
            name="filmography"
            value={resume.filmography ? resume.filmography : ''}
            fullWidth={true}
            multiLine={true}
            rows={3}
            onChange={this._handleFieldChange}
            floatingLabelText="Фильмография" />

          <TextField
            type="text"
            name="ad"
            value={resume.ad ? resume.ad : ''}
            fullWidth={true}
            multiLine={true}
            rows={3}
            onChange={this._handleFieldChange}
            floatingLabelText="Реклама" />

          <TextField
            name="languages"
            type="text"
            value={resume.languages ? resume.languages : ''}
            fullWidth={true}
            multiLine={true}
            rows={3}
            onChange={this._handleFieldChange}
            floatingLabelText="Занание языков" />

          <TextField
            name="text"
            multiLine={true}
            value={resume.text ? resume.text : ''}
            rows={3}
            fullWidth={true}
            onChange={this._handleFieldChange}
            floatingLabelText="Дополнительные сведения о себе" />

          <h4>Выберите подходящие рубрики</h4>
          {rubrics.length !== 0
            && rubrics.map((rubric, key) => <Checkbox
              key={key}
              label={rubric.name}
              checked={resume.rubrics.includes(rubric.id)}
              onCheck={this._handleRubricOnCheck}
              value={rubric.id}
              style={styles.checkbox} />
          )}

          <RaisedButton
            label="Сохранить резюме"
            primary={true}
            fullWidth={true}
            onTouchTap={this._handleSaveResume} />
        </div>
      }
    </div>;
  }
}

