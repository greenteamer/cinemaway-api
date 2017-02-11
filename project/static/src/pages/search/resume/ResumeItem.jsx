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
    const worker = store.users.find(u => u.id === id);
    return <div className="pv4">
      <div className="flex justify-between">
        <div className="">
          <h1>{worker.firstname} {worker.lastname}</h1>
          <RaisedButton
            label="Откликнуться"
            primary={true}
            onTouchTap={this._handleOnRequest}
          />
        </div>
        <Paper className="pa2" zDepth={1} >
          <List>
            <Subheader>Общая информация:</Subheader>
            <ListItem primaryText="Город" secondaryText={worker.resume.city} />
            <ListItem primaryText="Образование" secondaryText={worker.resume.edu} />
            <ListItem primaryText="Знание языков" secondaryText={worker.resume.languages} />
          </List>
        </Paper>
      </div>
      <hr />
      <h4>Фильмография</h4>
      <p>{worker.resume.filmography}</p>
      <hr />
      <h4>Реклама</h4>
      <p>{worker.resume.ad}</p>
      <hr />
      <h4>О себе</h4>
      <p>{worker.resume.text}</p>
      <ResumeDialog
        vacancy={this.vacancy}
        store={store}
        workerId={worker.id}
        open={this.open}
        onClose={this.handleOnClose}/>
    </div>;
  }
}

export default ResumeCard;
