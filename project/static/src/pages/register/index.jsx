import './auth.sass';
import React from 'react';
import { RegisterForm, LoginForm } from '../../components/register';
import { inject, observer } from 'mobx-react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';


@inject('store') @observer
export default class TabsExampleSwipeable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }
  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
  render() {
    return (
      <div className="auth-container">
        <div className="box">
          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}
          >
            <Tab label="Войти" value={0} />
            <Tab label="Зарегистрироваться" value={1} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <LoginForm action={store.login}/>
            <RegisterForm action={store.register}/>
          </SwipeableViews>
        </div>
      </div>
    );
  }
}
