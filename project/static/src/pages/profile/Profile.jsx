import React from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
// import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {CardHeader, CardTitle } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
// import RaisedButton from 'material-ui/RaisedButton';
import TableRequests from '../../components/requests/TableRequests';
import styles from './styles';
import ProfileForm from './ProfileForm';
import ResumeForm from './ResumeForm';
import { UIStore } from '../../stores';


@inject('store') @observer
export default class Profile extends React.Component {

  static propTypes = {
    store: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleSuccess = (reqId, newMessage) => {
    console.log('on success request id: ', reqId);
    const { store } = this.props;
    store.addUserResponse(store.user.id, reqId, true, newMessage);
  }

  render() {
    const { store } = this.props;
    if (UIStore.isLoading || !store.user) {
      return null;
    }
    const userRequests = observable(
      store.user.inputRequests
        .filter(r => !!r.vacancyObj)
    );

    return <div style={styles.card}>

      <CardHeader>
        <CardTitle title="Ваш профиль" subtitle="Введите данные в поля ниже" />
      </CardHeader>

      <div className="flex">
        <Paper zDepth={1} rounded={false}  style={styles.form}>
          <ProfileForm />
        </Paper>
      </div>
      <Paper zDepth={1} rounded={false} className="mt4">
        <div className="pa3">
          <h3>
            Отправленные Вам предложения
          </h3>
          <TableRequests
            requests={userRequests}
            columnName="Вакансия"
            getLinkFunc={(req) => <Link to={ req.vacancyObj.absoluteUrl }>{ req.vacancyObj.name }</Link>}
            onSuccess={this.handleSuccess}
          />
        </div>
      </Paper>
      <Paper zDepth={1} rounded={false} className="mt4">
        <ResumeForm />
      </Paper>

    </div>;
  }
}
