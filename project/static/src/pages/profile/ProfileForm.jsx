import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
// import IconButton from 'material-ui/IconButton';
// import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles';
import Dropzone from 'react-dropzone';
// import $ from 'jquery';
// import { getCookie } from '../../utils.js';
// import FlatButton from 'material-ui/FlatButton';
// import { Modal, ModalManager, Effect } from '../../components/dialog';


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

  _handleSaveProfile = () => {
    const { store } = this.props;
    store.user.serverSave();
    // ModalManager.open(<Modal
    //   effect={Effect.Newspaper}
    //   onRequestClose={() => true}>
    //   <div style={{ padding: 10 }}>
    //     <p>После сохранения Вы не сможете изменить свою роль</p>
    //     <div style={{ float: 'right', padding: 10 }}>
    //       <FlatButton
    //         label="Отмена"
    //         primary={true}
    //         onTouchTap={ModalManager.close}
    //       />
    //       <FlatButton
    //         label="Сохранить"
    //         primary={true}
    //         onTouchTap={() => {
    //           store.user.serverSave();
    //           ModalManager.close();
    //         }}
    //       />
    //     </div>
    //   </div>
    // </Modal>);
  }

  // _handleRubricOnCheck = (e) => {
  //   console.log('rubruc e: ', e.target.value);
  //   const { store } = this.props;
  //   const id = parseInt(e.target.value, 10);
  //   store.user.toggleRubric(id);
  // }

  _openFileDialog = () => {
    const fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  }

  _handleFileUpload = (e) => {
    console.log('file upload : ', e);
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
    const { store: { user } } = this.props;
    user.avatarFile = acceptedFiles[0];
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
    console.log('avatar file: ', user.avatarFile);
    return <div style={styles.fields}>

      <div className="flex justify-between">
        <Dropzone onDrop={this.onDrop}
          style={{
            width: '50%',
            border: '2px dashed #000',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          className="ba">
          {user.avatar &&
              <img src={user.avatarFile ? user.avatarFile.preview : user.avatar} /> ||
              <div>Try dropping some files here, or click to select files to upload.</div>
          }
        </Dropzone>

        <div style={{ width: '34px', height: '34px', padding: '0', overflow: 'hidden', borderRadius: '17px' }}>
          <img src={user.avatar} />
        </div>
      </div>

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
