import React from 'react';
import { inject, observer } from 'mobx-react';
// import IconButton from 'material-ui/IconButton';
// import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import { Modal, ModalManager, Effect } from '../../../components/dialog';
// import TextField from 'material-ui/TextField';
// import Toggle from 'material-ui/Toggle';


@inject('store') @observer
export default class RequestItem extends React.Component {

  static propTypes = {
    store: React.PropTypes.object,
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  _handleDeleteRequest = (id) => {
    const { store } = this.props;
    ModalManager.open(<Modal
      effect={Effect.Newspaper}
      onRequestClose={() => true}>
      <div style={{ padding: 10 }}>
        <h2>Удалить предложение?</h2>
        <div style={{ float: 'right', padding: 10 }}>
          <FlatButton
            label="Закрыть"
            primary={true}
            onTouchTap={ModalManager.close}
          />
          <FlatButton
            label="Удалить"
            primary={true}
            onTouchTap={() => {
              store.deleteRequest(id);
              ModalManager.close();
            }}
          />
        </div>
      </div>
    </Modal>);
  }

  render() {
    const { store } = this.props;
    if (!store.user) return null;
    return <div>
      <h1>{store.user.isWorker && 'Приглашение' || 'Запрос от пользователя'}</h1>
    </div>;
  }
}
