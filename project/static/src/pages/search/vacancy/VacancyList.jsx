import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import VacancyDialog from './VacancyDialog';

const VacancySubtitle = ({vacancy}) => {
  const rubrics = store.rubrics.filter(r => vacancy.rubrics.includes(r.id));
  return <div>
    <p className="mb0 b">{vacancy.price}</p>
    {rubrics.map(r => <span>{r.name}, </span>)}
  </div>;
};

const VacancyCard = ({vacancy, onRequest}) => <Card>
  <CardHeader
    title={vacancy.name}
    subtitle={<VacancySubtitle vacancy={vacancy} />}
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
  onRequest: React.PropTypes.func,
};


@inject('store') @observer
export default class VacancyList extends React.Component {

  @observable open = false;
  @observable tmpObj = { text: '' };
  @observable vacancy = { id: null, owner: null };
  @observable workerId = null;

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

  render() {
    const { store, vacancies } = this.props;
    console.log('store.avaliableVacancies: ', store.avaliableVacancies);
    return <div>
      {vacancies.length &&
        vacancies.map((vacancy, key) => {
          return <VacancyCard
            key={key}
            vacancy={vacancy}
            onRequest={this._handleOnRequest}
          />;
        }) ||
        <h1>Нет доступных вакансий</h1>
      }
      <VacancyDialog
        vacancy={this.vacancy}
        store={store}
        open={this.open}
        onClose={this.handleOnClose}/>
    </div>;
  }
}

