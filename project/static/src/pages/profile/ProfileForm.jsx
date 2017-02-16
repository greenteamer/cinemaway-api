import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles';
import Dropzone from 'react-dropzone';


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
  }

  onDrop = (acceptedFiles) => {
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
            maxWidth: '50%',
            border: '2px dashed #000',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          className="ba">
          {user.avatar &&
            <img src={user.avatarFile ? user.avatarFile.preview : user.avatar} />
              || <img src={user.avatarFile ? user.avatarFile.preview : '/static/src/images/default_large.png'} />
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
