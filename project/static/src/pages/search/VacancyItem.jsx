import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Modal, ModalManager, Effect } from '../../components/dialog';


@inject('store') @observer
class VacancyCard extends React.Component {
  static propTypes = {
    store: React.PropTypes.object,
    params: React.PropTypes.object,
  }

  @observable tmpObj = { text: '' };

  handleChangeText = (e, value) => {
    this.tmpObj.text = value;
  }

  onRequest = (vacancy) => {
    console.log('_handleOnRequest vacancy: ', vacancy);
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
    const { store, params } = this.props;
    const id = parseInt(params.vacancyId, 10);
    const vacancy = store.vacancies.find(v => v.id === id);
    return <div>
      <h1>{vacancy.name}</h1>
      <FlatButton
        label="Откликнуться"
        onTouchTap={() => this.onRequest(vacancy)}
      />
      <p>{vacancy.description}</p>
    </div>;
  }
}

VacancyCard.propTypes = {
  vacancy: React.PropTypes.object,
  onRequest: React.PropTypes.func,
};

export default VacancyCard;
