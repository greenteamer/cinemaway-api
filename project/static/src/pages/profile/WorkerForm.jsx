import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';


@inject('store') @observer
export default class WorkerForm extends Component {
  _handleFileChange = (e) => {
    console.log(e.target.value);
  }

  _openFileDialog = (e) => {
    const fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  }

  render() {
    const { store: { profile }, styles } = this.props;
    if (!profile) {
      return null;
    }
    console.log('WorkerForm styles: ', styles);
    return <div style={styles}>
      <TextField
        type="text"
        name="lastname"
        fullWidth={true}
        floatingLabelText="Фамилия"
        value={profile.lastname ? profile.lastname : ''}
        onChange={(e, value) => profile.setData('lastname', value)}/>
      <TextField
        type="text"
        name="firstname"
        fullWidth={true}
        floatingLabelText="Имя" />
      <TextField
        type="text"
        name="city"
        fullWidth={true}
        floatingLabelText="Город" />
      <TextField
        type="text"
        name="phone"
        fullWidth={true}
        floatingLabelText="Телефон" />
      <TextField
        type="text"
        name="edu"
        fullWidth={true}
        multiLine={true}
        rows={3}
        floatingLabelText="Образование" />
      <TextField
        type="text"
        name="filmography"
        fullWidth={true}
        multiLine={true}
        rows={3}
        floatingLabelText="Фильмография" />
      <TextField
        type="text"
        name="ad"
        fullWidth={true}
        multiLine={true}
        rows={3}
        floatingLabelText="Реклама" />
      <TextField
        name="languages"
        type="text"
        fullWidth={true}
        multiLine={true}
        rows={3}
        floatingLabelText="Занание языков" />
      <RaisedButton label="Primary" primary={true} onTouchTap={this._openFileDialog}/>
      <input
        name="image"
        ref="fileUpload"
        type="file"
        style={{"display" : "none"}}
        onChange={this._handleFileChange}/>
      <TextField
        name="text"
        multiLine={true}
        rows={3}
        fullWidth={true}
        floatingLabelText="Дополнительные сведения о себе" />
      <RaisedButton label="Сохранить профиль" primary={true} fullWidth={true} onTouchTap={this._openFileDialog} />
    </div>;
  }
}
