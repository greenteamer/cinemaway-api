import React from 'react';
// import { Link } from 'react-router';
import { observer } from 'mobx-react';
import { observable, toJS } from 'mobx';
// import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
// import {CardHeader, CardTitle } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
// import RaisedButton from 'material-ui/RaisedButton';
import MessageForm from './MessageForm';


@observer
export default class MessageList extends React.Component {

  static propTypes = {
    messages: React.PropTypes.object,
    sendMessage: React.PropTypes.func,
  }

  @observable tmpMessage = '';

  renderMessage = (message) => {
    if (message.isOwner) {
      return <div className="mr5 mv3 pa2 ba brtr-7px brtl-7px brbr-7px  b--light-silver bg-light-gray">
        <span className="black">{ message.text }</span>
      </div>;
    }
    return <div className="ml5 mv3 pa2 ba brtr-7px brtl-7px brbl-7px b--light-silver">
      <span className="black">{ message.text }</span>
    </div>;
  }

  render() {
    const { messages, sendMessage } = this.props;
    console.log('messages: ', toJS(messages));
    return <Paper zDepth={1} rounded={false} className="mt4 pa3">
      <h3>Сообщения</h3>
      {messages.length !== 0 &&
          messages.map((m, index) => <div key={index} >
            {this.renderMessage(m)}
        </div>)
      }
      <MessageForm message={this.tmpMessage} sendMessage={sendMessage} />
    </Paper>;
  }
}
