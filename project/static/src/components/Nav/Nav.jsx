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
    return <IconMenu
      iconButtonElement={store.profile && store.profile.image
        ? <IconButton><Avatar size={26} src={store.profile.image} /></IconButton>
        : <IconButton><MoreVertIcon color="white" /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem className="menu-item" primaryText="Мой профиль" onTouchTap={() => browserHistory.push('/profile')}/>
      <MenuItem className="menu-item" primaryText="Вакансии" onTouchTap={() => browserHistory.push('/profile/vacancies')}/>
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
    <FlatButton label="Default" style={styles.button} />
    <FlatButton label="Default" style={styles.button} />
    <FlatButton label="Default" style={styles.button} />
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
