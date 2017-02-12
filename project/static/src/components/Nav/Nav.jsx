import styles from './styles';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
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
    if (!store.user) return null;
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
      <MenuItem className="menu-item" primaryText="Мои вакансии" onTouchTap={() => browserHistory.push('/profile/vacancies')}/>
      <MenuItem className="menu-item" primaryText="Отклики и приглашения" onTouchTap={() => browserHistory.push('/profile/requests')}/>
      <MenuItem className="menu-item" primaryText="Моя аренда" onTouchTap={() => browserHistory.push('/profile/rents')}/>
      <MenuItem className="menu-item" primaryText="Выйти" onTouchTap={this.logout} />
    </IconMenu>;
  }
}


Logged.muiName = 'IconMenu';


const FlatButtonExampleSimple = () => {
  const browserHistoryHandler = (path) => {
    browserHistory.push(path);
  };
  return <div>
    <FlatButton label="Главная" style={styles.button} onTouchTap={() => browserHistoryHandler('/')}/>
    <FlatButton label="Рубрики" style={styles.button} onTouchTap={() => browserHistoryHandler('/rubrics')}/>
    <FlatButton label="Добавить вакансию" style={styles.button} onTouchTap={() => browserHistoryHandler('/profile/vacancies')} />
    <FlatButton label="Отклики и приглашения" style={styles.button} onTouchTap={() => browserHistoryHandler('/profile/requests')} />
  </div>;
};


@observer
export default class Nav extends React.Component {
  state = {
    logged: true,
  }

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  }

  render() {
    return <AppBar
      title={null}
      id="menu"
      iconElementLeft={<FlatButtonExampleSimple/>}
      iconElementRight={<Logged />}
    >
    </AppBar>;
  }
}
