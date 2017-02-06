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
import FlatButton from 'material-ui/FlatButton';
import { Modal, ModalManager, Effect } from '../../components/dialog';


@inject('store', 'uiStore') @observer
export default class ProfileForm extends Component {
  static propTypes = {
    store: React.PropTypes.object,
    uiStore: React.PropTypes.object,
  }

  _handleFileChange = () => {
  }

  _handleRoleChange = (e, value) => {
    const { store } = this.props;
    store.user.setRole(value);
  };

  // _handleSaveProfile = () => {
  //   const { uiStore } = this.props;
  //   // store.user.save();
  //   uiStore.openDialog();
  // }

  _handleSaveProfile = () => {
    const { store } = this.props;
    ModalManager.open(<Modal
      effect={Effect.Newspaper}
      onRequestClose={() => true}>
      <div style={{ padding: 10 }}>
        <p>После сохранения Вы не сможете изменить свою роль</p>
        <div style={{ float: 'right', padding: 10 }}>
          <FlatButton
            label="Отмена"
            primary={true}
            onTouchTap={ModalManager.close}
          />
          <FlatButton
            label="Сохранить"
            primary={true}
            onTouchTap={() => {
              store.user.serverSave();
              ModalManager.close();
            }}
          />
        </div>
      </div>
    </Modal>);
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
    user.setData(e.target.name, value);
  }

  render() {
    const { store: { user } } = this.props;
    if (!user) {
      return null;
    }
    console.log('user: ', user);
    return <div style={styles.fields}>


      <TextField
        type="text"
        name="firstname"
        fullWidth={true}
        floatingLabelText="Имя"
        value={user.firstname ? user.firstname : ''}
        onChange={this._handleFieldChange}/>

      <TextField
        type="text"
        name="lastname"
        fullWidth={true}
        floatingLabelText="Фамилия"
        value={user.lastname ? user.lastname : ''}
        onChange={this._handleFieldChange}/>

      <TextField
        type="text"
        name="city"
        value={user.city ? user.city : ''}
        fullWidth={true}
        onChange={this._handleFieldChange}
        floatingLabelText="Город" />

      <TextField
        type="text"
        name="phone"
        value={user.phone ? user.phone : ''}
        fullWidth={true}
        onChange={this._handleFieldChange}
        floatingLabelText="Телефон" />
      {(user.groups.length === 0 || user.groups[0] === 2) &&
        <div>
          <TextField
            type="text"
            name="edu"
            value={user.edu ? user.edu : ''}
            fullWidth={true}
            multiLine={true}
            rows={3}
            onChange={this._handleFieldChange}
            floatingLabelText="Образование" />

          <TextField
            type="text"
            name="filmography"
            value={user.filmography ? user.filmography : ''}
            fullWidth={true}
            multiLine={true}
            rows={3}
            onChange={this._handleFieldChange}
            floatingLabelText="Фильмография" />

          <TextField
            type="text"
            name="ad"
            value={user.ad ? user.ad : ''}
            fullWidth={true}
            multiLine={true}
            rows={3}
            onChange={this._handleFieldChange}
            floatingLabelText="Реклама" />

          <TextField
            name="languages"
            type="text"
            value={user.languages ? user.languages : ''}
            fullWidth={true}
            multiLine={true}
            rows={3}
            onChange={this._handleFieldChange}
            floatingLabelText="Занание языков" />
        </div>
      }
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
        value={user.text ? user.text : ''}
        rows={3}
        fullWidth={true}
        onChange={this._handleFieldChange}
        floatingLabelText="Дополнительные сведения о себе" />

      <RaisedButton
        label="Сохранить профиль"
        primary={true}
        fullWidth={true}
        onTouchTap={this._handleSaveProfile} />
    </div>;
  }
}
