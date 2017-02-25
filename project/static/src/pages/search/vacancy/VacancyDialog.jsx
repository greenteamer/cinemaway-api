import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';


const DialogModal = observer(({vacancy, store, open, onClose}) => {
  let text = observable('');
  const actions = [
    <FlatButton
      label="Отмена"
      primary={true}
      onTouchTap={onClose}
    />,
    <RaisedButton
      label="Откликнуться"
      primary={true}
      onTouchTap={() => {
        const userRequestObj = {
          owner: store.user.id,
          vacancy: vacancy.id,
          rent: null,
          object: vacancy.owner,
          text: text,
        };
        store.addUserRequest(userRequestObj);
        onClose();
      }}
    />,
  ];

  const handleChangeText = (e, value) => {
    text = value;
  };

  return (
    <Dialog
      title="Подать заявку на вакансию"
      actions={actions}
      modal={true}
      open={open}
    >
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
