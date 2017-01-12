import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';


export default class EmployerForm extends Component {
  render() {
    return <div>
      <TextField
        type="email"
        name="email"
        fullWidth={true}
        hintText="example@gmail.com"
        floatingLabelText="Введите Вашу почту" />
      <TextField
        type="email"
        name="email"
        fullWidth={true}
        hintText="example@gmail.com"
        floatingLabelText="Введите Вашу почту" />
    </div>;
  }
}
