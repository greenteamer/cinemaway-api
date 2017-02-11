import React from 'react';
import { Link } from 'react-router';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import VacancyList from './vacancy/VacancyList';
import RentList from './rent/RentList';
import ResumeList from './resume/ResumeList';
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
    const rubric = store.rubrics.find(r => r.id === rubricId);
    const parentRubric = store.rubrics.find(r => r.id === rubric.parent);
    const vacancies = observable(store.avaliableVacancies.filter(v => v.rubrics.includes(rubricId)));
    const rubricImage = parentRubric ? parentRubric.image : rubric.image;
    return <div>
      <div className="" style={{ background: `url(${rubricImage})` }}>
        <div className="col-xs-12 col-sm-4 pa2 title-gradient">
          <p className="f3 ttu mb0">{rubric.name}</p>
          <Link className="f6 ttu gray" to={`/rubrics/${parentRubric.id}`} >{parentRubric.name}</Link>
        </div>
      </div>
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
          <ResumeList workers={store.workers}/>
        </div>
        <div>
          <RentList rents={store.rents}/>
        </div>
      </SwipeableViews>
    </div>;
  }
}
