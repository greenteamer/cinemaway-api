import React from 'react';
import { inject, observer } from 'mobx-react';
import VacancyList from './VacancyList';
import WorkerList from './WorkerList';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';


@inject('store') @observer
export default class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  static propTypes = {
    store: React.PropTypes.object,
    params: React.PropTypes.object,
    rubricId: React.PropTypes.number,
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    const { store, rubricId } = this.props;
    const vacancies = store.avaliableVacancies.filter(v => v.rubrics.includes(rubricId));
    return <div>
      <Tabs
        onChange={this.handleChange}
        value={this.state.slideIndex}
      >
        <Tab label="Вакансии" value={0} />
        <Tab label="Резюме" value={1} />
        <Tab label="Аренда" value={2} />
      </Tabs>
      <SwipeableViews
        index={this.state.slideIndex}
        onChangeIndex={this.handleChange}
      >
        <div>
          <VacancyList vacancies={vacancies}/>
        </div>
        <div>
          <WorkerList workers={store.workers}/>
        </div>
        <div>
          slide n°3
        </div>
      </SwipeableViews>
    </div>;
  }
}
