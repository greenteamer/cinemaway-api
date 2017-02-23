import React from 'react';
// import { Link } from 'react-router';
import { observer } from 'mobx-react';
// import { observable } from 'mobx';
// import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
// import {CardHeader, CardTitle } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
import MessageList from './MessageList';


@observer
export default class RoomList extends React.Component {

  static propTypes = {
    rooms: React.PropTypes.object,
    sendMessage: React.PropTypes.func,
  }

  render() {
    const { rooms, sendMessage } = this.props;

    return <div>
      <h3>Ваши чаты</h3>
      {rooms.length !== 0 &&
        rooms.map((r, index) => <Paper key={index} zDepth={1} rounded={false} className="mt4">
          <div className="pa3">
            <p>{ r.user1Obj.fullName } - { r.user2Obj.fullName }</p>
            <MessageList messages={r.messages} sendMessage={sendMessage} />
          </div>
        </Paper>)
      }
    </div>;
  }
}
