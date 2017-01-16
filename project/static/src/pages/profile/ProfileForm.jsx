import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { SimpleDialog } from '../../components/dialog';


@inject('store', 'uiStore') @observer
export default class WorkerForm extends Component {
  static propTypes = {
    store: React.PropTypes.object,
    styles: React.PropTypes.object,
    uiStore: React.PropTypes.object,
  }

  _handleFileChange = () => {
  }

  handleRoleChange = (e, value) => {
    const { store } = this.props;
    store.profile.setRole(value);
  };

  _handleSaveProfile = () => {
    const { store: { profile } } = this.props;
    console.log('_handleSaveProfile start');
    profile.save();
  }

  _openFileDialog = () => {
    const fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  }

  _handleFieldChange = (e, value) => {
    const { store: { profile } } = this.props;
    profile.setData(e.target.name, value);
  }

  render() {
    const { store: { profile }, styles, uiStore } = this.props;
    if (!profile) {
      return null;
    }
    return <div style={styles}>

      <h4>Выберите вашу роль</h4>
      <RadioButtonGroup name="selectRole" onChange={this.handleRoleChange} defaultSelected={profile.role}>
        <RadioButton
          value="worker"
          label="Соискатель"
          disabled={profile.isSaved} />
        <RadioButton
          value="employer"
          label="Работодатель"
          disabled={profile.isSaved} />
      </RadioButtonGroup>

      <TextField
        type="text"
        name="firstname"
        fullWidth={true}
        floatingLabelText="Имя"
        value={profile.firstname}
        onChange={this._handleFieldChange}/>

      <TextField
        type="text"
        name="lastname"
        fullWidth={true}
        floatingLabelText="Фамилия"
        value={profile.lastname}
        onChange={this._handleFieldChange}/>

      <TextField
        type="text"
        name="city"
        value={profile.city}
        fullWidth={true}
        onChange={this._handleFieldChange}
        floatingLabelText="Город" />

      <TextField
        type="text"
        name="phone"
        value={profile.phone}
        fullWidth={true}
        onChange={this._handleFieldChange}
        floatingLabelText="Телефон" />

      <TextField
        type="text"
        name="edu"
        value={profile.edu}
        fullWidth={true}
        multiLine={true}
        rows={3}
        onChange={this._handleFieldChange}
        floatingLabelText="Образование" />

      <TextField
        type="text"
        name="filmography"
        value={profile.filmography}
        fullWidth={true}
        multiLine={true}
        rows={3}
        onChange={this._handleFieldChange}
        floatingLabelText="Фильмография" />

      <TextField
        type="text"
        name="ad"
        value={profile.ad}
        fullWidth={true}
        multiLine={true}
        rows={3}
        onChange={this._handleFieldChange}
        floatingLabelText="Реклама" />

      <TextField
        name="languages"
        type="text"
        value={profile.languages}
        fullWidth={true}
        multiLine={true}
        rows={3}
        onChange={this._handleFieldChange}
        floatingLabelText="Занание языков" />

      <RaisedButton
        label="Primary"
        primary={true}
        onTouchTap={this._openFileDialog}/>

      <input
        name="image"
        ref="fileUpload"
        type="file"
        style={{ display: 'none' }}
        onChange={this._handleFileChange}/>

      <TextField
        name="text"
        multiLine={true}
        value={profile.text}
        rows={3}
        fullWidth={true}
        onChange={this._handleFieldChange}
        floatingLabelText="Дополнительные сведения о себе" />

      <RaisedButton
        label="Сохранить профиль"
        primary={true}
        fullWidth={true}
        onTouchTap={this._handleSaveProfile} />

        <SimpleDialog
          show={uiStore.dialog}
          onSubmit={() => {
            profile.serverSave();
            uiStore.closeDialog();
          }}
          onCancel={() => uiStore.closeDialog()}>
          <p>Hello</p>
        </SimpleDialog>
    </div>;
  }
}

