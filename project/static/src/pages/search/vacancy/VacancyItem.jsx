import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import RaisedButton from 'material-ui/RaisedButton';
import VacancyDialog from './VacancyDialog';


@inject('store') @observer
class VacancyCard extends React.Component {
  static propTypes = {
    store: React.PropTypes.object,
    params: React.PropTypes.object,
    onRequest: React.PropTypes.func,
  }

  @observable open = false;

  onRequest = () => {
    this.open = true;
  }

  render() {
    const { store, params } = this.props;
    const id = parseInt(params.vacancyId, 10);
    const vacancy = store.vacancies.find(v => v.id === id);
    return <div>
      <h1>{vacancy.name}</h1>
      <p>{vacancy.description}</p>
      <RaisedButton
        label="Откликнуться"
        primary={true}
        onTouchTap={this.onRequest}
      />
      <VacancyDialog
        vacancy={vacancy}
        store={store}
        open={this.open}
        onClose={() => { this.open = false; }}/>
    </div>;
  }
}

export default VacancyCard;
