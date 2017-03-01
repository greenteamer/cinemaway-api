import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import RaisedButton from 'material-ui/RaisedButton';
import VacancyDialog from './VacancyDialog';
import IconButton from 'material-ui/IconButton';
import { browserHistory } from 'react-router';


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
    if (!vacancy) return null;
    return <div className="row">
      <div className="col-md-9">
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
      </div>
      <div className="col-md-3 tr">
        <IconButton
          onTouchTap={() => browserHistory.push(vacancy.ownerObj.absoluteUrl)}
          style={{ width: '50', height: '50px', margin: '4px', padding: '0px', overflow: 'hidden', borderRadius: '25px', textAlign: 'right' }}>
          <img src={vacancy.ownerObj.avatar} />
        </IconButton>
        <p onTouchTap={() => browserHistory.push(vacancy.ownerObj.absoluteUrl)}>
          {vacancy.ownerObj.fullName}
        </p>
      </div>
    </div>;
  }
}

export default VacancyCard;
