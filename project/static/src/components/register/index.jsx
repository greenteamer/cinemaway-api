import './Forms.sass';
import React from 'react';
import { inject, observer } from 'mobx-react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';



@inject('store') @observer
export class RegisterForm extends React.Component {

  static propTypes = {
    store: React.PropTypes.object,
  }

  actionHandler = (e) => {
    e.preventDefault();
    const { store } = this.props;
    const email = e.target.email.value;
    const password1 = e.target.password1.value;
    const password2 = e.target.password2.value;
    store.register(email, password1, password2);
  }

  render() {
    return <Card id="register-form">
      <CardTitle title="Регистрация" subtitle="Введите данные в поля ниже" />
      <CardText>
        <form className="form" onSubmit={this.actionHandler}>
          <TextField
            type="email"
            name="email"
            fullWidth={true}
            hintText="example@gmail.com"
            floatingLabelText="Введите Вашу почту" />
          <TextField
            hintText=""
            floatingLabelText="Ваш пароль"
            type="password"
            name="password1"
            fullWidth={true}/>
          <TextField
            hintText=""
            floatingLabelText="Введите пароль еще раз"
            type="password"
            name="password2"
            fullWidth={true} />
          <FlatButton
            className="btn btn-full-width"
            label="Зарегистрироваться"
            primary={true}
            type="submit" />
        </form>
      </CardText>
      <CardActions className="social-container">
        <FlatButton
          className="btn btn-fb"
          href="#"
          label=" Facebook"
          icon={<i className="fa fa-facebook left" />} />
        <FlatButton
          className="btn btn-vk"
          href="#"
          label=" Vkontakte"
          icon={<i className="fa fa-vk left" />} />
      </CardActions>
    </Card>;
  }
}


@inject('store') @observer
export class LoginForm extends React.Component {

  static propTypes = {
    store: React.PropTypes.object,
  }

  actionHandler = (e) => {
    e.preventDefault();
    console.log('Form actionHandler e: ', e.target.email.value);
    const { store } = this.props;
    const email = e.target.email.value;
    const password = e.target.password.value;
    store.login(email, password);
  }

  render() {
    return <Card id="login-form">
      <CardTitle title="Вход" subtitle="Введите данные в поля ниже" />
      <CardText>
        <form className="form" onSubmit={this.actionHandler}>
          <TextField
            type="email"
            name="email"
            fullWidth={true}
            hintText="example@gmail.com"
            floatingLabelText="Введите Вашу почту" />
          <TextField
            hintText="Password Field"
            floatingLabelText="Ваш пароль"
            type="password"
            name="password"
            fullWidth={true}/>
          <FlatButton
            className="btn btn-full-width"
            label="Войти"
            primary={true}
            type="submit" />
        </form>
      </CardText>
      <CardActions className="social-container">
        <FlatButton
          className="btn btn-fb"
          href="#"
          label=" Facebook"
          icon={<i className="fa fa-facebook left" />} />
        <FlatButton
          className="btn btn-vk"
          href="#"
          label=" Vkontakte"
          icon={<i className="fa fa-vk left" />} />
      </CardActions>
    </Card>;
  }
}
