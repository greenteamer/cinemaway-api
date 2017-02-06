import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Modal, ModalManager, Effect } from '../../components/dialog';
import { browserHistory } from 'react-router';


const VacancyCard = ({vacancy, onRequest}) => <Card>
  <CardHeader
    title={vacancy.name}
    subtitle="Subtitle"
    actAsExpander={true}
    showExpandableButton={true}
  />
  <CardActions>
    <FlatButton
      label="Откликнуться"
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

  @observable tmpObj = { text: '' };

  static propTypes = {
    store: React.PropTypes.object,
    vacancies: React.PropTypes.array,
  }

  handleChangeText = (e, value) => {
    this.tmpObj.text = value;
  }

  _handleOnRequest = (vacancy) => {
    const { store } = this.props;
    const self = this;
    ModalManager.open(<Modal
      effect={Effect.Newspaper}
      onRequestClose={() => true}>
      <div style={{ padding: 10 }}>
        <h2>Ваш комментарий</h2>
        <TextField
          hintText="Ваш комментарий"
          floatingLabelText="Ваш комментарий"
          multiLine={true}
          rows={2}
          onChange={self.handleChangeText}
        />
        <div style={{ float: 'right', padding: 10 }}>
          <FlatButton
            label="Отмена"
            primary={true}
            onTouchTap={ModalManager.close}
          />
          <FlatButton
            label="Отправить"
            primary={true}
            onTouchTap={() => {
              store.addUserRequest(store.user.id, vacancy.id, vacancy.owner, self.tmpObj.text);
              ModalManager.close();
            }}
          />
        </div>
      </div>
    </Modal>);
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
    </div>;
  }
}
