import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
// import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
// import Checkbox from 'material-ui/Checkbox';
// import { SimpleDialog } from '../../components/dialog';
// import { SimpleDialog } from '../../components/dialog';
import styles from './styles';
// import FlatButton from 'material-ui/FlatButton';
// import { Modal, ModalManager, Effect } from '../../components/dialog';


@inject('store', 'uiStore') @observer
export default class ResumeForm extends Component {

  constructor() {
    super();
    this.state = {
      populateProfile: false,
    };
  }

  static propTypes = {
    store: React.PropTypes.object,
    uiStore: React.PropTypes.object,
  }

  _handleFileChange = () => {
  }

  _handleSaveResume = () => {
    const { store: { user } } = this.props;
    user.resume.save();
  }

  _handleOnPopulateProfile = () => {
    const { store } = this.props;
    store.addResume();
  }

  _handleRubricOnCheck = (e) => {
    console.log('rubruc e: ', e.target.value);
    const { store } = this.props;
    const id = parseInt(e.target.value, 10);
    store.user.toggleRubric(id);
  }

  _openFileDialog = () => {
    const fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  }

  _handleFieldChange = (e, value) => {
    const { store: { user } } = this.props;
    user.resume.setData(e.target.name, value);
  }

  render() {
    const { store: { user } } = this.props;
    if (!user) {
      return null;
    }
    const { resume } = user;
    return <div style={styles.fields}>
      {!user.resume &&
        <RaisedButton
          label="Заполнить резюме"
          primary={true}
          fullWidth={true}
          onTouchTap={this._handleOnPopulateProfile} />
      }

      {user.resume &&
        <div>
          <h3>Заполните поля вакансии</h3>
          <TextField
            type="text"
            name="city"
            value={resume.city ? resume.city : ''}
            fullWidth={true}
            onChange={this._handleFieldChange}
            floatingLabelText="Город" />

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
