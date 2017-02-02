import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
// import { SimpleDialog } from '../../components/dialog';
import { SimpleDialog } from '../../components/dialog';
import styles from './styles';


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
    console.log('start role change');
    store.user.setRole(value);
  };

  _handleSaveProfile = () => {
    const { uiStore } = this.props;
    // store.user.save();
    uiStore.openDialog();
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
    const { store: { user, rubrics } } = this.props;
    if (!user) {
      return null;
    }
    console.log('user: ', user);
    return <div style={styles.fields}>
      <h4>Выберите вашу роль</h4>
      <RadioButtonGroup
        name="selectRole"
        defaultSelected={user.protected ? user.groups[0] : 2}
        onChange={this._handleRoleChange}>
        <RadioButton
          value={2}
          disabled={user.protected}
          label="Соискатель"/>
        <RadioButton
          value={1}
          disabled={user.protected}
          label="Работодатель" />
      </RadioButtonGroup>

      <Divider style={styles.divider}/>
      <h4>Выберите подходящие рубрики</h4>
      {rubrics.length !== 0
        && rubrics.map((rubric, key) => <Checkbox
          key={key}
          label={rubric.name}
          checked={user.rubrics.includes(rubric.id)}
          onCheck={this._handleRubricOnCheck}
          value={rubric.id}
          style={styles.checkbox} />
      )}

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

      <SimpleDialog
        onSubmit={() => user.serverSave()}
        onCancel={() => console.log('test on cancel')}>
        <p>После сохранения Вы не сможете изменить свою роль</p>
      </SimpleDialog>
    </div>;
  }
  //   return <div style={styles.fields}>
  //     <h4>Выберите вашу роль</h4>
  //     <RadioButtonGroup
  //       name="selectRole"
  //       defaultSelected={user.protected ? user.groups[0] : 2}
  //       onChange={this._handleRoleChange}>
  //       <RadioButton
  //         value={2}
  //         disabled={user.protected}
  //         label="Соискатель"/>
  //       <RadioButton
  //         value={1}
  //         disabled={user.protected}
  //         label="Работодатель" />
  //     </RadioButtonGroup>

  //     <Divider style={styles.divider}/>
  //     <h4>Выберите подходящие рубрики</h4>
  //     {rubrics.length !== 0
  //       && rubrics.map((rubric, key) => <Checkbox
  //         key={key}
  //         label={rubric.name}
  //         checked={user.rubrics.includes(rubric.id)}
  //         onCheck={this._handleRubricOnCheck}
  //         value={rubric.id}
  //         style={styles.checkbox} />
  //     )}

  //     <TextField
  //       type="text"
  //       name="firstname"
  //       fullWidth={true}
  //       floatingLabelText="Имя"
  //       value={user.firstname ? user.firstname : ''}
  //       onChange={this._handleFieldChange}/>

  //     <TextField
  //       type="text"
  //       name="lastname"
  //       fullWidth={true}
  //       floatingLabelText="Фамилия"
  //       value={user.lastname ? user.lastname : ''}
  //       onChange={this._handleFieldChange}/>

  //     <TextField
  //       type="text"
  //       name="city"
  //       value={user.city ? user.city : ''}
  //       fullWidth={true}
  //       onChange={this._handleFieldChange}
  //       floatingLabelText="Город" />

  //     <TextField
  //       type="text"
  //       name="phone"
  //       value={user.phone ? user.phone : ''}
  //       fullWidth={true}
  //       onChange={this._handleFieldChange}
  //       floatingLabelText="Телефон" />
  //     {(user.groups.length === 0 || user.groups[0] === 2) &&
  //       <div>
  //         <TextField
  //           type="text"
  //           name="edu"
  //           value={user.edu ? user.edu : ''}
  //           fullWidth={true}
  //           multiLine={true}
  //           rows={3}
  //           onChange={this._handleFieldChange}
  //           floatingLabelText="Образование" />

  //         <TextField
  //           type="text"
  //           name="filmography"
  //           value={user.filmography ? user.filmography : ''}
  //           fullWidth={true}
  //           multiLine={true}
  //           rows={3}
  //           onChange={this._handleFieldChange}
  //           floatingLabelText="Фильмография" />

  //         <TextField
  //           type="text"
  //           name="ad"
  //           value={user.ad ? user.ad : ''}
  //           fullWidth={true}
  //           multiLine={true}
  //           rows={3}
  //           onChange={this._handleFieldChange}
  //           floatingLabelText="Реклама" />

  //         <TextField
  //           name="languages"
  //           type="text"
  //           value={user.languages ? user.languages : ''}
  //           fullWidth={true}
  //           multiLine={true}
  //           rows={3}
  //           onChange={this._handleFieldChange}
  //           floatingLabelText="Занание языков" />
  //       </div>
  //     }
  //     <RaisedButton
  //       label="Primary"
  //       primary={true}
  //       onTouchTap={this._openFileDialog}/>

  //     <input
  //       name="image"
  //       ref="fileUpload"
  //       type="file"
  //       style={{ display: 'none' }}
  //       onChange={this._handleFileChange}/>

  //     <TextField
  //       name="text"
  //       multiLine={true}
  //       value={user.text ? user.text : ''}
  //       rows={3}
  //       fullWidth={true}
  //       onChange={this._handleFieldChange}
  //       floatingLabelText="Дополнительные сведения о себе" />

  //     <RaisedButton
  //       label="Сохранить профиль"
  //       primary={true}
  //       fullWidth={true}
  //       onTouchTap={this._handleSaveProfile} />

  //     <SimpleDialog
  //       onSubmit={() => user.serverSave()}
  //       onCancel={() => console.log('test on cancel')}>
  //       <p>После сохранения Вы не сможете изменить свою роль</p>
  //     </SimpleDialog>
  //   </div>;
  // }
}
