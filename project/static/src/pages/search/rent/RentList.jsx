import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import RentDialog from './RentDialog';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';


const RentCard = ({rent, onRequest}) => <Card className="mb3">
  <CardHeader
    title={rent.name}
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
  @observable rubricFilter = null;

  static propTypes = {
    store: React.PropTypes.object,
    rents: React.PropTypes.object,
  }

  _handleOnRequest = (rent) => {
    this.open = true;
    this.rent.id = rent.id;
    this.rent.owner = rent.owner;
  }

  handleFilter = (e) => {
    this.rubricFilter = e;
  }

  render() {
    const { store, rents } = this.props;
    const filteredRents = this.rubricFilter
      ? rents.filter(rent => rent.rentRubrics.includes(this.rubricFilter))
      : rents;
    return <div className="flex">
      <Paper style={{
        display: 'inline-block',
        margin: '16px 32px 16px 2px',
        width: '30%',
      }}>
        <h5 className="pa3">Рубрики: </h5>
        <List>
          <ListItem
            primaryText="Показать все"
            onTouchTap={() => { this.rubricFilter = null; }}
          />
          {store.rubrics.length !== 0 &&
            store.rentRubrics.map(( r, index ) => {
              if (r.level !== 0) return null;
              const children = store.rentRubrics.filter(storeRentRubric => storeRentRubric.parent === r.id);
              if (children.length !== 0) {
                return <ListItem
                  key={index}
                  value={r.id}
                  primaryText={r.name}
                  onNestedListToggle={() => this.handleFilter(r.id)}
                  initiallyOpen={false}
                  primaryTogglesNestedList={true}
                  nestedItems={children.map((rr, index) => <ListItem
                    key={index}
                    value={rr.id}
                    primaryText={rr.name}
                    onTouchTap={() => this.handleFilter(rr.id)}
                  />)}
                />;
              }
              return <ListItem
                key={index}
                value={r.id}
                primaryText={r.name}
                onTouchTap={() => this.handleFilter(r.id)}
              />;
            })
          }
        </List>
      </Paper>
      <div className="mt3 mr1 w-100">
        {filteredRents.length &&
            filteredRents.map((rent, key) => {
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
      </div>
    </div>;
  }
}
