import React from 'react';
// import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
// import { observable } from 'mobx';
import {CardHeader, CardTitle } from 'material-ui/Card';
// import { UIStore } from '../../../stores';
// import IconButton from 'material-ui/IconButton';
// import {List, ListItem} from 'material-ui/List';
// import Divider from 'material-ui/Divider';
import MessageList from '../../../components/messages/MessageList';


@inject('store') @observer
export default class Messages extends React.Component {

  static propTypes = {
    store: React.PropTypes.object,
    params: React.PropTypes.object,
  }

  handleSendMessage = (message) => {
    console.log('send message', message);
    const { store, params } = this.props;
    const id = parseInt(params.roomId, 10);
    if (store.users.length === 0) return null;
    const room = store.rooms.find(r => r.id === id);
    store.addMessage(message, room.objectObj.id);
  }


  render() {
    const { store, params } = this.props;
    const id = parseInt(params.roomId, 10);
    if (store.rooms.length === 0) return null;
    const room = store.rooms.find(r => r.id === id);
    return <div>
      <CardHeader>
        <CardTitle title={`Пользователь ${room.objectObj.fullName}`}/>
      </CardHeader>
      <MessageList messages={room.messages} sendMessage={this.handleSendMessage}/>
    </div>;
  }
}
