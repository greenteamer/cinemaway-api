import React from 'react';
import { inject, observer } from 'mobx-react';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
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


  // actionHandler = (e) => {
  //   e.preventDefault();
  //   const { store } = this.props;
  //   const email = e.target.email.value;
  //   const password1 = e.target.password1.value;
  //   const password2 = e.target.password2.value;
  //   store.register(email, password1, password2);
  // }

  render() {
    if (UIStore.isLoading) {
      return null;
    }
    return <Card style={styles.card}>

      <CardHeader>
        <CardTitle title="Ваш профиль" subtitle="Введите данные в поля ниже" />
      </CardHeader>

      <CardText style={styles.cartText}>
        <Paper zDepth={1} rounded={false}  style={styles.form}>
          <ProfileForm />
        </Paper>
        <Paper zDepth={1} rounded={false}  style={styles.form}>
          <ResumeForm />
        </Paper>
      </CardText>

    </Card>;
  }
}
