import React from 'react';
import { inject, observer } from 'mobx-react';
// import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {CardHeader, CardTitle } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
// import RaisedButton from 'material-ui/RaisedButton';

import styles from './styles';
import ProfileForm from './ProfileForm';
import ResumeForm from './ResumeForm';
import { UIStore } from '../../stores';


@inject('store') @observer
export default class Profile extends React.Component {

  static propTypes = {
    store: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  render() {
    if (UIStore.isLoading) {
      return null;
    }
    return <div style={styles.card}>

      <CardHeader>
        <CardTitle title="Ваш профиль" subtitle="Введите данные в поля ниже" />
      </CardHeader>

      <div className="flex">
        <Paper zDepth={1} rounded={false}  style={styles.form}>
          <ProfileForm />
        </Paper>
      </div>
      <Paper zDepth={1} rounded={false} className="mt4">
        <ResumeForm />
      </Paper>

    </div>;
  }
}
