import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'mobx-react';
import { Store, UIStore } from './stores';
import {
  Home,
  SubRubrics,
  Rubrics,
  Register,
  Profile,
  Vacancies,
  ProfileRents,
  VacancyItem,
  ResumeItem,
  RentItem,
  Requests,
  RequestItem,
} from './pages';
import { Layout, BGLayout } from './components';
import { Nav } from './components/Nav';


class Oauth extends React.Component {
  render() {
    const params = new URL(window.location.href).searchParams;
    console.log('location params: ', params.get('token'));
    window.localStorage.setItem('token', params.get('token'));
    return <div>
      <h1>Test oauth success { window.location.pathname } </h1>
    </div>;
  }
}

class Fail extends React.Component {
  render() {
    return <div>
      <h1>Test oauth fail</h1>
    </div>;
  }
}

export const routes = <Router history={browserHistory}>
  <Route path="/" >
    <Route path="auth" component={BGLayout}>
      <IndexRoute components={{ content: Register, nav: Nav}} />
    </Route>
    <Route component={Layout}>
      <IndexRoute components={{ content: Home, nav: Nav}} />
      <Route path="profile">
        <IndexRoute components={{ content: Profile, nav: Nav }} />
        <Route path="vacancies" components={{ content: Vacancies, nav: Nav}} />
        <Route path="requests">
          <IndexRoute components={{ content: Requests, nav: Nav }} />
          <Route path=":requestId" components={{ content: RequestItem, nav: Nav}} />
        </Route>
        <Route path="rents" components={{ content: ProfileRents, nav: Nav}} />
      </Route>
      <Route path="rubrics">
        <IndexRoute components={{ content: Rubrics, nav: Nav}} />
        <Route path=":rubricId" components={{ content: SubRubrics, nav: Nav}}/>
      </Route>
      <Route path="vacancies">
        <Route path=":vacancyId" components={{ content: VacancyItem, nav: Nav}}/>
      </Route>
      <Route path="rents">
        <Route path=":rentId" components={{ content: RentItem, nav: Nav}}/>
      </Route>
      <Route path="users">
        <Route path=":userId" components={{ content: ResumeItem, nav: Nav}}/>
      </Route>
      <Route path="oauth">
        <Route path="success" components={{ content: Oauth, nav: Nav}} />
        <Route path="fail" components={{ content: Fail, nav: Nav}} />
      </Route>
    </Route>
  </Route>
</Router>;


export default function RouterContainer() {
  return <Provider store={Store} uiStore={UIStore}>
    {routes}
  </Provider>;
}
