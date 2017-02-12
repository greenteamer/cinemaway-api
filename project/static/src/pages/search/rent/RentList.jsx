import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import RentDialog from './RentDialog';


const RentCard = ({rent, onRequest}) => <Card>
  <CardHeader
    title={rent.name}
    subtitle="Subtitle"
    avatar={<IconButton style={{ width: '100', height: '70', margin: '4px', padding: '0px'}}>
      <img src={rent.image} />
    </IconButton>}
    actAsExpander={true}
    showExpandableButton={true}
  />
  <CardActions>
    <RaisedButton
      label="Откликнуться"
      primary={true}
      onTouchTap={() => onRequest(rent)}
    />
    <FlatButton
      label="Подробнее"
      onTouchTap={() => browserHistory.push(rent.absoluteUrl)}
    />
  </CardActions>
  <CardText expandable={true}>
    {rent.description}
  </CardText>
</Card>;
RentCard.propTypes = {
  rent: React.PropTypes.object,
  onRequest: React.PropTypes.func,
};


@inject('store') @observer
export default class RentList extends React.Component {

  @observable open = false;
  @observable rent = { id: null, owner: null }

  static propTypes = {
    store: React.PropTypes.object,
    rents: React.PropTypes.object,
  }

  _handleOnRequest = (rent) => {
    this.open = true;
    this.rent.id = rent.id;
    this.rent.owner = rent.owner;
  }

  render() {
    const { store, rents } = this.props;
    return <div>
      {rents.length &&
        rents.map((rent, key) => {
          return <RentCard
            key={key}
            rent={rent}
            onRequest={() => this._handleOnRequest(rent)}
          />;
        }) ||
        <h1>Нет аренды</h1>
      }
      <RentDialog
        rent={this.rent}
        store={store}
        open={this.open}
        onClose={() => { this.open = false; }}/>
    </div>;
  }
}
