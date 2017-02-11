import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const DialogModal = observer(({vacancy, store, workerId, open, onClose}) => {
  let text = observable('');
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={onClose}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      onTouchTap={() => {
        const userRequestObj = {
          owner: store.user.id,
          vacancy: vacancy.id,
          rent: null,
          object: workerId,
          text: text,
        };
        store.addUserRequest(userRequestObj);
        onClose();
      }}
    />,
  ];

  const handleSelectVacancy = (e, index, value) => {
    // vacancy.id = parseInt(e.target.value, 10);
    vacancy.id = value;
    console.log('handleSelectVacancy vacancy: ', vacancy);
  };

  const handleChangeText = (e, value) => {
    text = value;
  };

  return (
    <Dialog
      title="Отправить предложение пользователю"
      actions={actions}
      modal={true}
      open={open}
    >
      <div>
        <SelectField
          floatingLabelText="Вакансии"
          value={vacancy.id}
          onChange={handleSelectVacancy}>
          {store.user &&
              store.user.vacancies.map(( v, index ) => <MenuItem key={index} value={v.id} primaryText={v.name} />)
          }
        </SelectField>
      </div>
      <div>
        <TextField
          hintText="Ваш комментарий"
          floatingLabelText="Ваш комментарий"
          multiLine={true}
          rows={2}
          onChange={handleChangeText}
        />
      </div>
    </Dialog>
  );
});

DialogModal.propTypes = {
  open: React.PropTypes.bool,
};

export default DialogModal;
