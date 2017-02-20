import React from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import VacancyList from './search/vacancy/VacancyList';
import RentList from './search/rent/RentList';
import ResumeList from './search/resume/ResumeList';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
  width: '20%',
};


@inject('store') @observer
export default class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  @observable rubricFilter = null;

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

  handleFilter = (e) => {
    console.log('e target: ', e);
    this.rubricFilter = e;
  }

  render() {
    const { store } = this.props;
    const workers = this.rubricFilter
      ? store.workers.filter(w => w.resume.rubrics.includes(this.rubricFilter))
      : store.workers;
    return <div className="flex">
      <Paper style={style}>
        <h5 className="pa3">Рубрики: </h5>
        <Menu>
          {store.rubrics.length !== 0 &&
              store.rubrics.map(r => <MenuItem value={r.id} primaryText={r.name} onTouchTap={() => this.handleFilter(r.id)}/>)
          }
        </Menu>
      </Paper>
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
            <ResumeList workers={workers}/>
          </div>
          <div>
            <RentList rents={store.rents}/>
          </div>
        </SwipeableViews>
      </div>
    </div>;
  }
}
