import styles from './styles';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import AppBar from 'material-ui/AppBar';
// import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


@inject('store') @observer
class Logged extends Component {
  static propTypes = {
    store: React.PropTypes.object,
  }
  logout = () => {
    const { store } = this.props;
    console.log('test logout');
    store.logout();
  }
  render() {
    const { store } = this.props;
    if (!store.user) return <MenuItem
      primaryText="Войти"
      style={{ color: 'white' }}
      onTouchTap={() => browserHistory.push('/auth')}
    />;
    return <IconMenu
      iconButtonElement={store.user && store.user.avatar
        ? <IconButton style={{ width: '34px', height: '34px', margin: '8px', padding: '0px', overflow: 'hidden', borderRadius: '17px' }}>
          <img src={store.user.avatar} />
        </IconButton>
        : <IconButton><MoreVertIcon color="white" /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem className="menu-item" primaryText="Мой профиль" onTouchTap={() => browserHistory.push('/profile')}/>
      <MenuItem className="menu-item" primaryText="Мои сообщения" onTouchTap={() => browserHistory.push('/profile/rooms')}/>
      <MenuItem className="menu-item" primaryText="Мои вакансии" onTouchTap={() => browserHistory.push('/profile/vacancies')}/>
      <MenuItem className="menu-item" primaryText="Мои отклики" onTouchTap={() => browserHistory.push('/profile/requests')}/>
      <MenuItem className="menu-item" primaryText="Моя аренда" onTouchTap={() => browserHistory.push('/profile/rents')}/>
      <MenuItem className="menu-item" primaryText="Выйти" onTouchTap={this.logout} />
    </IconMenu>;
  }
}


Logged.muiName = 'IconMenu';


const FlatButtonExampleSimple = ({user}) => {
  const browserHistoryHandler = (path) => {
    browserHistory.push(path);
  };
  if (!user) return  <div>
    <img src="/static/img/logo4min.png" style={{height: '50px', verticalAlign: 'top' }}/>
    <FlatButton label="Главная" style={styles.button} onTouchTap={() => browserHistoryHandler('/')}/>
    <FlatButton label="Все предложения" style={styles.button} onTouchTap={() => browserHistoryHandler('/all')}/>
  </div>;
  return <div>
    <img src="/static/img/logo4min.png" style={{height: '50px', verticalAlign: 'top' }}/>
    <FlatButton label="Главная" style={styles.button} onTouchTap={() => browserHistoryHandler('/')}/>
    <FlatButton label="Все предложения" style={styles.button} onTouchTap={() => browserHistoryHandler('/all')}/>
    <FlatButton label="Добавить вакансию" style={styles.button} onTouchTap={() => browserHistoryHandler('/profile/vacancies')} />
    <FlatButton label="Добавить аренду" style={styles.button} onTouchTap={() => browserHistoryHandler('/profile/rents')} />
    <FlatButton label="Мои отклики" style={styles.button} onTouchTap={() => browserHistoryHandler('/profile/requests')} />
  </div>;
};


@inject('store') @observer
export default class Nav extends React.Component {
  state = {
    logged: true,
  }

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  }

  render() {
    const { store } = this.props;
    return <AppBar
      title={null}
      id="menu"
      iconElementLeft={<FlatButtonExampleSimple user={store.user}/>}
      iconElementRight={<Logged />}
      iconStyleLeft={{ marginLeft: '0px', marginTop: '0px' }}
      style={{ paddingLeft: '0px' }}
    >
    </AppBar>;
  }
}
