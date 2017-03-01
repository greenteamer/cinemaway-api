import React, { Component } from 'react';
// import Formsy from 'formsy-react';
// import { FormsyCheckbox, FormsyText } from 'formsy-material-ui/lib';
import { inject, observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


@inject('store') @observer
export class VacancyFormFields extends Component {

  static propTypes = {
    vacancy: React.PropTypes.object,
    store: React.PropTypes.object,
  }

  _handleOnBlur = (e) => {
    console.log('_handleOnBlur value: ', this.refs[e.target.name]);
  }

  _handileAddVacancy = () => {
    console.log('handle add vacancy');
  }

  _handleOnCheck = (e, value) => {
    const { vacancy } = this.props;
    if (value) {
      vacancy.rubrics.push(parseInt(e.target.value, 10));
    }
    else {
      vacancy.rubrics.remove(parseInt(e.target.value, 10));
    }
  }


  render() {
    const { vacancy, store } = this.props;
    return <div className="row">

      <div className="col-sm-12 col-md-6">
        <TextField
          ref="name"
          name="name"
          hintText="Заголовок"
          errorText=""
          onBlur={this._handleOnBlur}
          floatingLabelText="Заголовок"
          defaultValue={vacancy.name}
          onChange={(e) => { vacancy.name = e.target.value; }}
        />
        <br />
        <TextField
          hintText="Описание"
          floatingLabelText="Описание вакансии"
          defaultValue={vacancy.description}
            multiLine={true}
          rows={3}
          onChange={(e) => { vacancy.description = e.target.value; }}
        />
      </div>

      <div className="col-sm-12 col-md-6">
        <TextField
          hintText="Оплата"
          floatingLabelText="Оплата"
          defaultValue={vacancy.price}
          onChange={(e) => { vacancy.price = e.target.value; }}
        />
        <br />
        <h4>Выберите рубрики</h4>

        {store.rubrics.length &&
          store.rubrics.map(( r, key ) =>
            <Checkbox
              key={key}
              label={r.name}
              checked={vacancy.rubrics.includes(r.id)}
              onCheck={this._handleOnCheck}
              value={r.id}
            />
          )
        }

      </div>
    </div>;
  }
}


@inject('store') @observer
export default class VacancyDialog extends React.Component {

  static propTypes = {
    dialog: React.PropTypes.object,
    vacancy: React.PropTypes.object,
    onSubmit: React.PropTypes.func,
    children: React.PropTypes.element,
  }

  _handleCancelVacancy = () => {
    this.props.dialog.show = false;
  }

  _handleSaveVacancy = () => {
    this.props.vacancy.save();
    this.props.dialog.show = false;
  }

  render() {
    const { vacancy, onSubmit, children } = this.props;
    console.log('VacancyForm dialog vacancy : ', vacancy);
    const dialogActions = [
      <FlatButton
        label="Отмена"
        primary={true}
        onTouchTap={this._handleCancelVacancy}
      />,
      <RaisedButton
        label="Сохранить"
        primary={true}
        onTouchTap={onSubmit ? onSubmit : this._handleSaveVacancy}
      />,
    ];
    return <Dialog
      ref="dialog"
      title="Вакансия"
      actions={dialogActions}
      modal={true}
      open={this.props.dialog.show}
      autoScrollBodyContent={true}
    >
      {children && children ||
        <VacancyFormFields
          vacancy={vacancy}
        />
      }
    </Dialog>;
  }
}
