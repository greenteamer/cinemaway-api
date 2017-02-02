import React from 'react';
import { inject, observer } from 'mobx-react';
import VacancyList from './VacancyList';
import WorkerList from './WorkerList';


@inject('store') @observer
export default class SearchPage extends React.Component {
  static propTypes = {
    store: React.PropTypes.object,
    params: React.PropTypes.object,
    rubricId: React.PropTypes.number,
  }
  render() {
    const { store, rubricId } = this.props;
    const vacancies = store.avaliableVacancies.filter(v => v.rubrics.includes(rubricId));
    return <div>
      {store.user.isWorker &&
        <VacancyList vacancies={vacancies}/> ||
        <WorkerList workers={store.workers}/>
      }
    </div>;
  }
}
