import React from 'react';
import { inject, observer } from 'mobx-react';
import VacancyList from './search/vacancy/VacancyList';
import RentList from './search/rent/RentList';
import ResumeList from './search/resume/ResumeList';
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
    const { store } = this.props;
    return <div className="flex">
      <div style={{ width: '100%'  }}>
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
            <VacancyList vacancies={store.avaliableVacancies}/>
          </div>
          <div>
            <ResumeList workers={store.workers}/>
          </div>
          <div>
            <RentList rents={store.rents}/>
          </div>
        </SwipeableViews>
      </div>
    </div>;
  }
}
