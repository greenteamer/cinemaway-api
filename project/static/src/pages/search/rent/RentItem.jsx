import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
// import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
// import Dialog from 'material-ui/Dialog';
import RentDialog from './RentDialog';
import IconButton from 'material-ui/IconButton';
import { browserHistory } from 'react-router';


@inject('store') @observer
class RentItem extends React.Component {
  static propTypes = {
    store: React.PropTypes.object,
    params: React.PropTypes.object,
    onRequest: React.PropTypes.func,
  }

  @observable open = false;
  @observable rent = { id: null, owner: null }

  onRequest = (rent) => {
    this.open = true;
    this.rent.id = rent.id;
    this.rent.owner = rent.owner;
  }

  render() {
    const { store, params } = this.props;
    const id = parseInt(params.rentId, 10);
    const rent = store.rents.find(rent => rent.id === id);
    if (!rent) return null;
    return <div className="row">
      <div className="col-md-9">
        <h1>{rent.name}</h1>
        <p>{rent.description}</p>
        <RaisedButton
          label="Откликнуться"
          primary={true}
          onTouchTap={() => this.onRequest(rent)}
        />
        <RentDialog
          rent={this.rent}
          store={store}
          open={this.open}
          onClose={() => { this.open = false; }}/>
      </div>
      <div className="col-md-3 tr">
        <IconButton
          onTouchTap={() => browserHistory.push(rent.ownerObj.absoluteUrl)}
          style={{ width: '50', height: '50px', margin: '4px', padding: '0px', overflow: 'hidden', borderRadius: '25px', textAlign: 'right' }}>
          <img src={rent.ownerObj.avatar} />
        </IconButton>
        <p onTouchTap={() => browserHistory.push(rent.ownerObj.absoluteUrl)}>
          {rent.ownerObj.fullName}
        </p>
      </div>
    </div>;
  }
}

export default RentItem;
