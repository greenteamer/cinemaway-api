import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import VacancyDialog from './VacancyDialog';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';

const VacancySubtitle = ({vacancy, store}) => {
  const rubrics = store.rubrics.filter(r => vacancy.rubrics.includes(r.id));
  return <div>
    <p className="mb0 b">{vacancy.price}</p>
    {rubrics.map(r => <span>{r.name}, </span>)}
  </div>;
};
VacancySubtitle.propTypes = {
  vacancy: React.PropTypes.object,
  store: React.PropTypes.object,
};

const VacancyCard = ({vacancy, onRequest, store}) => <Card className="mb3">
  <CardHeader
    title={vacancy.name}
    subtitle={<VacancySubtitle store={store} vacancy={vacancy} />}
    actAsExpander={true}
    showExpandableButton={true}
  />
  <CardActions>
    <RaisedButton
      label="Откликнуться"
      primary={true}
      onTouchTap={() => onRequest(vacancy)}
    />
    <FlatButton
      label="Подробнее"
      onTouchTap={() => browserHistory.push(vacancy.absoluteUrl)}
    />
  </CardActions>
  <CardText expandable={true}>
    {vacancy.description}
  </CardText>
</Card>;
VacancyCard.propTypes = {
  vacancy: React.PropTypes.object,
  store: React.PropTypes.object,
  onRequest: React.PropTypes.func,
};


@inject('store') @observer
export default class VacancyList extends React.Component {

  @observable open = false;
  @observable tmpObj = { text: '' };
  @observable vacancy = { id: null, owner: null };
  @observable workerId = null;
  @observable rubricFilter = null;

  static propTypes = {
    store: React.PropTypes.object,
    vacancies: React.PropTypes.object,
  }

  handleOnClose = () => {
    this.open = false;
  }

  handleChangeText = (e, value) => {
    this.tmpObj.text = value;
  }

  _handleOnRequest = (vacancy) => {
    this.open = true;
    this.vacancy.id = vacancy.id;
    this.vacancy.owner = vacancy.owner;
  }

  handleFilter = (e) => {
    this.rubricFilter = e;
  }

  render() {
    const { store, vacancies } = this.props;
    const filteredVacancy = this.rubricFilter
      ? vacancies.filter(v => v.rubrics.includes(this.rubricFilter))
      : vacancies;
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
            style={{}}
          />
          {store.rubrics.length !== 0 &&
              store.rubrics.map(r => <ListItem
                value={r.id}
                primaryText={r.name}
                onTouchTap={() => this.handleFilter(r.id)}
                style={{}}
              />)
          }
        </List>
      </Paper>
      <div className="mt3 mr1 w-100">
        {filteredVacancy.length &&
            filteredVacancy.map((vacancy, key) => {
              return <VacancyCard
                key={key}
                vacancy={vacancy}
                onRequest={this._handleOnRequest}
                store={store}
              />;
            }) ||
            <h1>Нет доступных вакансий</h1>
        }
      </div>
      <VacancyDialog
        vacancy={this.vacancy}
        store={store}
        open={this.open}
        onClose={this.handleOnClose}/>
    </div>;
  }
}

