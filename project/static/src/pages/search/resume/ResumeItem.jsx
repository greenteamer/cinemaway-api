import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ResumeDialog from './ResumeDialog';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


@inject('store') @observer
class ResumeCard extends React.Component {
  static propTypes = {
    store: React.PropTypes.object,
    params: React.PropTypes.object,
    onRequest: React.PropTypes.func,
  }

  @observable open = false;
  @observable vacancy = { id: null };

  _handleOnRequest = () => {
    this.open = true;
  }

  handleOnClose = () => {
    this.open = false;
  }

  render() {
    const { store, params } = this.props;
    const id = parseInt(params.userId, 10);
    const user = store.users.find(u => u.id === id);
    return <div className="pv4">
      <div className="flex justify-between">
        <div className="">
          <h1>{user.firstname} {user.lastname}</h1>
        </div>
      </div>
      {user.resume &&
        <div>
          <Paper className="pa2" zDepth={1} >
            <List>
              <Subheader>Общая информация:</Subheader>
              <ListItem primaryText="Город" secondaryText={user.resume.city} />
              <ListItem primaryText="Образование" secondaryText={user.resume.edu} />
              <ListItem primaryText="Знание языков" secondaryText={user.resume.languages} />
            </List>
          </Paper>
          <hr />
          <h4>Фильмография</h4>
          <p>{user.resume.filmography}</p>
          <hr />
          <h4>Реклама</h4>
          <p>{user.resume.ad}</p>
          <hr />
          <h4>О себе</h4>
          <p>{user.resume.text}</p>
          <RaisedButton
            label="Откликнуться"
            primary={true}
            onTouchTap={this._handleOnRequest}
          />
          <ResumeDialog
            vacancy={this.vacancy}
            store={store}
            workerId={user.id}
            open={this.open}
            onClose={this.handleOnClose}/>
        </div>
      }
    </div>;
  }
}

export default ResumeCard;
