import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import FlatButton from 'material-ui/FlatButton';
import ResumeDialog from './ResumeDialog';


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
    return <div>
      <h1>{worker.firstname} {worker.lastname}</h1>
      <FlatButton
        label="Откликнуться"
        onTouchTap={this._handleOnRequest}
      />
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
