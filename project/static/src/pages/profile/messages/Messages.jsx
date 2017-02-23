import React from 'react';
// import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
// import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {CardHeader, CardTitle } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { UIStore } from '../../../stores';


@inject('store') @observer
export default class Messages extends React.Component {

  static propTypes = {
    store: React.PropTypes.object,
  }

  @observable tmpMessage = '';

  render() {
    const { store: { messages } } = this.props;
    const { store } = this.props;
    if (UIStore.isLoading || !store.user) {
      return null;
    }
    return <div>
      <CardHeader>
        <CardTitle title="Сообщения" subtitle={`Пользователь ${store.user.fullName}`} />
      </CardHeader>
      <h3>
        Сообщения
      </h3>
      {messages.length !== 0 &&
        messages.map((m, index) => <Paper key={index} zDepth={1} rounded={false} className="mt4">
          <div className="pa3">
            <p className={m.owner === store.user.id ? 'pr5 red' : 'pl5 blue'}>{ m.text }</p>
          </div>
        </Paper>)
      }
      <h5 className="mv3">Написать сообщение</h5>
      <TextField
        hintText="Message Field"
        floatingLabelText="MultiLine and FloatingLabel"
        multiLine={true}
        rows={2}
      />
      <RaisedButton
        onTouchTap={() => store.addMessage(this.tmpMessage)}
      >
        Отправить
      </RaisedButton>
    </div>;
  }
}
