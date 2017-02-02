import React from 'react';


export default class Status extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    req: React.PropTypes.object,
    isInvites: React.PropTypes.bool,
  }
  render() {
    const status = {
      name: '',
      state: '',
    };
    const { user, req, isInvites } = this.props;
    if (isInvites) {
      if (user.isWorker) {
        status.name = 'Приглашение';
        status.state = req.userResponse ? req.userResponse.status ? 'Принято' : 'Отклонено' : 'Приглашение';
      }
      if (!user.isWorker) {
        status.name = 'Вакансия';
        // status.state = req.userResponse.status ? 'Принята' : 'Отклонена';
        status.state = req.userResponse ? req.userResponse.status ? 'Принята' : 'Отклонена' : 'Вакансия';
      }
    }
    if (!isInvites) {
      if (user.isWorker) {
        status.name = 'Запрошено';
        // status.state = req.userResponse.status ? 'Принят' : 'Отклонен';
        status.state = req.userResponse ? req.userResponse.status ? 'Принят' : 'Отклонен' : 'Запрос';
      }
      if (!user.isWorker) {
        status.name = 'Предложение';
        // status.state = req.userResponse.status ? 'Принято' : 'Отклонено';
        status.state = req.userResponse ? req.userResponse.status ? 'Принято' : 'Отклонено' : 'Предложение';
      }
    }
    return <span>{status.state}</span>;
  }
}
