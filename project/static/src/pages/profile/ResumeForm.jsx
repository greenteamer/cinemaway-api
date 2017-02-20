import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import { observable, toJS, extendObservable } from 'mobx';
import TextField from 'material-ui/TextField';
// import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
// import { SimpleDialog } from '../../components/dialog';
// import { SimpleDialog } from '../../components/dialog';
import styles from './styles';
// import FlatButton from 'material-ui/FlatButton';
// import { Modal, ModalManager, Effect } from '../../components/dialog';


@inject('store', 'uiStore') @observer
export default class ResumeForm extends Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     populateProfile: false,
  //   };
  // }
  tmpResume = {};
  @observable open = false;

  constructor(props) {
    super();
    const { store } = props;
    extendObservable(this.tmpResume, initialData, store.user.resume ? toJS(store.user.resume) : {});
  }

  static propTypes = {
    store: React.PropTypes.object,
    uiStore: React.PropTypes.object,
  }

  // _handleFileChange = () => {
  // }

  _handleSaveResume = () => {
    // const { store: { user } } = this.props;
    // user.resume.save();
    const { store } = this.props;
    store.addResume(toJS(this.tmpResume));
  }

  _handleOnPopulateProfile = () => {
    this.open = true;
    // const { store } = this.props;
    // store.addResume();
  }

  _handleRubricOnCheck = (e) => {
    // console.log('rubruc e: ', e.target.value);
    // const { store } = this.props;
    // const id = parseInt(e.target.value, 10);
    // store.user.toggleRubric(id);

    const value = parseInt(e.target.value, 10);
    const newArr = this.tmpResume.rubrics.includes(value)
      ? this.tmpResume.rubrics.filter(r => r !== value)
      : [...this.tmpResume.rubrics, value];
    this.tmpResume.rubrics.replace(newArr);
  }

  _openFileDialog = () => {
    const fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  }

  _handleFieldChange = (e, value) => {
    // const { store: { user } } = this.props;
    this.tmpResume[e.target.name] = value;
  }

  render() {
    const { store: { user, rubrics } } = this.props;
    if (!user) {
      return null;
    }
    // const { resume } = user;
    const resume = this.tmpResume;
    // console.log('resume tmp : ', toJS(resume));
    return <div style={styles.fields}>
      {!this.open &&
        <RaisedButton
          label="Заполнить резюме"
          primary={true}
          fullWidth={true}
          onTouchTap={this._handleOnPopulateProfile} />
      }

      {this.open &&
        <div>
          <h3>Заполните резюме</h3>

          <TextField
            type="text"
            name="city"
            value={resume.city ? resume.city : ''}
            fullWidth={true}
            onChange={this._handleFieldChange}
            floatingLabelText="Город" />

          <TextField
            type="text"
            name="phone"
            value={resume.phone ? resume.phone : ''}
            fullWidth={true}
            onChange={this._handleFieldChange}
            floatingLabelText="Телефон" />

          <TextField
            type="text"
            name="edu"
            value={resume.edu ? resume.edu : ''}
            fullWidth={true}
            multiLine={true}
            rows={3}
            onChange={this._handleFieldChange}
            floatingLabelText="Образование" />

          <TextField
            type="text"
            name="filmography"
            value={resume.filmography ? resume.filmography : ''}
            fullWidth={true}
            multiLine={true}
            rows={3}
            onChange={this._handleFieldChange}
            floatingLabelText="Фильмография" />

          <TextField
            type="text"
            name="ad"
            value={resume.ad ? resume.ad : ''}
            fullWidth={true}
            multiLine={true}
            rows={3}
            onChange={this._handleFieldChange}
            floatingLabelText="Реклама" />

          <TextField
            name="languages"
            type="text"
            value={resume.languages ? resume.languages : ''}
            fullWidth={true}
            multiLine={true}
            rows={3}
            onChange={this._handleFieldChange}
            floatingLabelText="Занание языков" />

          <TextField
            name="text"
            multiLine={true}
            value={resume.text ? resume.text : ''}
            rows={3}
            fullWidth={true}
            onChange={this._handleFieldChange}
            floatingLabelText="Дополнительные сведения о себе" />

          <h4>Выберите подходящие рубрики</h4>
          {rubrics.length !== 0
            && rubrics.map((rubric, key) => <Checkbox
              key={key}
              label={rubric.name}
              checked={resume.rubrics.includes(rubric.id)}
              onCheck={this._handleRubricOnCheck}
              value={rubric.id}
              style={styles.checkbox} />
          )}

          <RaisedButton
            label="Сохранить резюме"
            primary={true}
            fullWidth={true}
            onTouchTap={this._handleSaveResume} />
        </div>
      }
    </div>;
  }
}

const initialData = {
  phone: '',
  city: '',
  edu: '',
  filmography: '',
  ad: '',
  languages: '',
  text: '',
  rubrics: [],
};

