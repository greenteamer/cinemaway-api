import React from 'react';
import { inject, observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import SwipeableViews from 'react-swipeable-views';

import styles from './styles';
import WorkerForm from './WorkerForm';
import EmployerForm from './EmployerForm';
import ResultData from './ResultData';


@inject('store') @observer
export default class Profile extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }
  handleChange = (value) => {
    const { store } = this.props;
    store.profile.setRole(value);
  };
  actionHandler = (e) => {
    e.preventDefault();
    console.log('Form actionHandler e: ', e.target.email.value);
    const { store } = this.props;
    console.log('Form register action: ', store.register);
    const email = e.target.email.value;
    const password1 = e.target.password1.value;
    const password2 = e.target.password2.value;
    store.register(email, password1, password2);
  }

  render() {
    const { store } = this.props;
    return <Card style={styles.card}>
      <CardHeader>
        <CardTitle title="Ваш профиль" subtitle="Введите данные в поля ниже" />

      </CardHeader>
      <CardText style={styles.cartText}>
        <Paper zDepth={1} rounded={false}  style={styles.form}>
          <Tabs
            onChange={this.handleChange}
            value={store.profile.role}>
            <Tab label="СОИСКАТЕЛЬ" value={0} />
            <Tab label="РАБОТОДАТЕЛЬ" value={1} />
          </Tabs>
          <SwipeableViews
            index={store.profile.role}
            onChangeIndex={this.handleChange}>
            <WorkerForm styles={styles.fields}/>
            <EmployerForm />
          </SwipeableViews>
        </Paper>
        <ResultData style={styles.resultData}/>
      </CardText>

    </Card>;
  }
}
