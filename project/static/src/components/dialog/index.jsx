import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


const SimpleDialog = ({ show, onSubmit, onCancel, children }) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={onCancel}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      onTouchTap={onSubmit}
    />,
  ];
  return <div>
    <Dialog
      title="Внимание"
      actions={actions}
      modal={true}
      open={show}
    >
      {children
        && children}
    </Dialog>
  </div>
}

export {
  SimpleDialog,
}
