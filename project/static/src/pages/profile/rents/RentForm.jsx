import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';
import Checkbox from 'material-ui/Checkbox';


@inject('store') @observer
export class RentFormFields extends Component {

  static propTypes = {
    rent: React.PropTypes.object,
    store: React.PropTypes.object,
  }

  _handleOnBlur = (e) => {
    console.log('_handleOnBlur value: ', this.refs[e.target.name]);
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
    const { rent } = this.props;
    rent.imageFile = acceptedFiles[0];
  }

  _handleRubricOnCheck = (e) => {
    const { rent } = this.props;
    const value = parseInt(e.target.value, 10);
    const newArr = rent.rentRubrics.includes(value)
      ? rent.rentRubrics.filter(r => r !== value)
      : [...rent.rentRubrics, value];
    rent.rentRubrics.replace(newArr);
  }

  render() {
    const { rent } = this.props;
    const { store: { rentRubrics } } = this.props;
    return <div className="row">

      <div className="col-sm-12 col-md-6">
        <Dropzone onDrop={this.onDrop}
          style={{
            width: '100%',
            minHeight: '200px',
            border: '2px dashed #000',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          className="ba">
          {rent.image &&
            <img src={rent.imageFile ? rent.imageFile.preview : rent.image} />
            || <img src={rent.imageFile ? rent.imageFile.preview : rent.image} />
          }
        </Dropzone>
        <TextField
          ref="name"
          name="name"
          hintText="Заголовок"
          errorText=""
          onBlur={this._handleOnBlur}
          floatingLabelText="Заголовок"
          defaultValue={rent.name}
          onChange={(e) => { rent.name = e.target.value; }}
        />
        <br />
        <TextField
          hintText="Описание"
          floatingLabelText="Описание аренды"
          defaultValue={rent.description}
          multiLine={true}
          rows={3}
          onChange={(e) => { rent.description = e.target.value; }}
        />
      </div>

      <div className="col-sm-12 col-md-6">
        <TextField
          type="number"
          hintText="Оплата"
          floatingLabelText="Оплата"
          defaultValue={rent.price}
          onChange={(e) => { rent.price = parseInt( e.target.value, 10 ); }}
        />

        <h4>Выберите подходящие рубрики</h4>
        {rentRubrics.length !== 0
          && rentRubrics.map((rubric, key) => <Checkbox
              key={key}
              label={rubric.name}
              checked={rent.rentRubrics.includes(rubric.id)}
              onCheck={this._handleRubricOnCheck}
              value={rubric.id}
            />
        )}

      </div>
    </div>;
  }
}


@inject('store') @observer
export default class RentDialog extends React.Component {

  static propTypes = {
    dialog: React.PropTypes.object,
    rent: React.PropTypes.object,
    onSubmit: React.PropTypes.func,
    children: React.PropTypes.element,
  }

  _handleCancelVacancy = () => {
    this.props.dialog.show = false;
  }

  _handleSaveVacancy = () => {
    this.props.rent.save();
    this.props.dialog.show = false;
  }

  render() {
    const { rent, onSubmit, children } = this.props;
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
      title="Аренда"
      actions={dialogActions}
      modal={true}
      open={this.props.dialog.show}
      autoScrollBodyContent={true}
    >
      {children && children ||
        <RentFormFields
          rent={rent}
        />
      }
    </Dialog>;
  }
}
