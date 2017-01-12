import styles from './styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


@inject('store') @observer
class Logged extends Component {
  logout = () => {
    const { store } = this.props;
    console.log('test logout');
    store.logout();
  }

  render() {
    return <IconMenu
      iconButtonElement={
        <IconButton><MoreVertIcon color="white" /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem className="menu-item" primaryText="Мой профиль" />
      <MenuItem className="menu-item" primaryText="Выйти" onTouchTap={this.logout} />
    </IconMenu>;
  }
}


Logged.muiName = 'IconMenu';

const FlatButtonExampleSimple = () => (
  <div>
    <FlatButton label="Default" style={styles.button} />
    <FlatButton label="Default" style={styles.button} />
    <FlatButton label="Default" style={styles.button} />
    <FlatButton label="Default" style={styles.button} />
  </div>
);



@observer
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
      iconElementLeft={<FlatButtonExampleSimple/>}
      iconElementRight={<Logged />}
    >
    </AppBar>;
  }
}
