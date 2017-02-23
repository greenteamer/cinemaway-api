import React from 'react';
import { inject, observer } from 'mobx-react';
import { observable, toJS } from 'mobx';
import {CardHeader, CardTitle } from 'material-ui/Card';
import { UIStore } from '../../../stores';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { browserHistory } from 'react-router';


@inject('store') @observer
export default class Messages extends React.Component {

  static propTypes = {
    store: React.PropTypes.object,
  }

  @observable tmpMessage = '';

  render() {
    const { store: { rooms } } = this.props;
    const { store } = this.props;
    if (UIStore.isLoading || !store.user) {
      return null;
    }
    return <div>
      <CardHeader>
        <CardTitle title="Диалоги"/>
      </CardHeader>
      <div className="ba " style={{ borderColor: '#e0e0e0' }}>
        <List>
          {rooms.length !== 0 &&
              rooms.map((r, index) => <div key={index}>
                {console.log('Rooms.js r.messages: ', toJS(r.messages))}
                <ListItem
                  leftAvatar={<IconButton style={{ width: '40px', height: '40px', margin: '0px', padding: '0px', overflow: 'hidden', borderRadius: '20px' }}>
                    <img src={r.objectObj.avatar} />
                  </IconButton>}
                  primaryText={r.objectObj.fullName}
                  secondaryText={
                    <p>{r.messages.length !== 0 && r.messages[r.messages.length - 1].text}</p>
                  }
                  secondaryTextLines={2}
                  onTouchTap={() => browserHistory.push(`/profile/rooms/${r.id}`)}
                />
                {index !== rooms.length - 1 &&
                  <Divider inset={true} />
                }
            </div>)
          }
        </List>
      </div>
    </div>;
  }
}
