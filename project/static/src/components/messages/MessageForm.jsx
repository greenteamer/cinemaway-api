import React from 'react';
import { observer } from 'mobx-react';
// import { observable } from 'mobx';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


@observer
export default class MessageForm extends React.Component {
  static propTypes = {
    message: React.PropTypes.string,
    sendMessage: React.PropTypes.func,
  }

  render() {
    const { sendMessage } = this.props;
    let { message } = this.props;
    return <div>
      <h5 className="mv3">Написать сообщение</h5>
      <TextField
        hintText="Ваше сообщение"
        floatingLabelText="Ваше сообщение"
        multiLine={true}
        onChange={(e, value) => {
          console.log('text field on change: ', value);
          message = value;
        }}
        rows={2}
      />
      <RaisedButton
        primary={true}
        onTouchTap={() => sendMessage(message)}
        label="Отправить"
      />
    </div>;
  }
}
