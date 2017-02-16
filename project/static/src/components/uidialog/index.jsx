import React from 'react';
import { observer } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


@observer
export default class UIDialog extends React.Component {

  static propTypes = {
    dialog: React.PropTypes.bool,
    title: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    children: React.PropTypes.element,
    actions: React.PropTypes.array,
  }

  render() {
    const { dialog, title, onSubmit, onCancel, children, actions } = this.props;
    const cancelButton = <FlatButton
      label="Отмена"
      primary={true}
      onTouchTap={onCancel}
    />;
    const submitButton = <FlatButton
      label="Сохранить"
      primary={true}
      onTouchTap={onSubmit}
    />;
    const defaultActions = [
      onCancel ? cancelButton : null,
      onSubmit ? submitButton : null,
    ];
    return <Dialog
      title={title}
      actions={actions ? actions : defaultActions}
      modal={true}
      open={dialog}
      autoScrollBodyContent={true}
    >
      {children &&
        children
      }
    </Dialog>;
  }
}
