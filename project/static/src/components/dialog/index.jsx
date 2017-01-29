import React from 'react';
import { observer } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { UIStore } from '../../stores';


const SimpleDialog = observer(({ onSubmit, onCancel, children, autoScrollBodyContent }) => {
  const actions = [
    <FlatButton
      label="Отмена"
      primary={true}
      onTouchTap={() => {
        onCancel();
        UIStore.closeDialog();
      }}
    />,
    <FlatButton
      label="Ок"
      primary={true}
      onTouchTap={() => {
        onSubmit();
        UIStore.closeDialog();
      }}
    />,
  ];
  return <div>
    <Dialog
      title="Внимание"
      actions={actions}
      modal={true}
      open={UIStore.dialog}
      autoScrollBodyContent={autoScrollBodyContent}
    >
      {children
        && children}
    </Dialog>
  </div>;
});

SimpleDialog.propTypes = {
  onSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  children: React.PropTypes.object,
  autoScrollBodyContent: React.PropTypes.bool,
};

export {
  SimpleDialog,
};
