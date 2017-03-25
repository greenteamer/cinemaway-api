import React from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import TableRequests from '../../../components/requests/TableRequests';


@inject('store') @observer
export default class RequestList extends React.Component {

  static propTypes = {
    store: React.PropTypes.object,
  }

  render() {
    const { store } = this.props;
    if (!store.user) return null;
    const vacanciesRequests = store.user.outputRequests
      .filter(r => r.vacancyObj && r.vacancyObj.owner !== r.owner)
      .sort((r1, r2) => new Date(r2.created_at) - new Date(r1.created_at));
    const resumeRequests = observable(
      store.user.outputRequests
        .filter(r => r.vacancyObj && r.vacancyObj.owner === r.owner)
    );
    const rentRequests = observable(
      store.user.outputRequests
        .filter(r => r.rentObj && r.rentObj.owner !== r.owner)
    );
    console.log('vacanciesRequests: ', vacanciesRequests.map(r => r.id));
    return <div>
      <br />
      {vacanciesRequests.length !== 0 &&
        <div>
          <h3>
            Мои отклики на вакансии
          </h3>
          <TableRequests
            requests={vacanciesRequests}
            columnName="Вакансия"
            getLinkFunc={(req) => <Link
              to={ req.vacancyObj.absoluteUrl }>
              { req.vacancyObj.name }
            </Link>
            }
          />
        </div>
      }
      {resumeRequests.length !== 0 &&
        <div>
          <h3>
            Мои отклики на резюме
          </h3>
          <TableRequests
            requests={resumeRequests}
            columnName="Резюме"
            getLinkFunc={(req) => <Link
              to={ req.objectObj.absoluteUrl }>
              { req.objectObj.fullName }
            </Link>
            }
          />
        </div>
      }
      {rentRequests.length !== 0 &&
        <div>
          <h3>
            Мои отклики на аренду
          </h3>
          <TableRequests
            requests={rentRequests}
            columnName="Позиция"
            getLinkFunc={(req) => <Link
              to={ req.rentObj.absoluteUrl }>
              { req.rentObj.name }
            </Link>
            }
          />
        </div>
      }
    </div>;
  }
}
