import React, {Component} from 'react';
import { observer } from 'mobx-react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../../styles/muiTheme';
import ReactDOM from 'react-dom';
import Assign from 'lodash.assign';


const prefix = require('react-prefixr');

const defaultStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    overflow: 'hidden',
    perspective: 1300,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  content: {
    position: 'relative',
    margin: '15% auto',
    width: '60%',
    border: '1px solid rgba(0, 0, 0, .2)',
    background: '#fff',
    overflow: 'auto',
    borderRadius: '3px',
    outline: 'none',
    boxShadow: '0 5px 10px rgba(0, 0, 0, .5)',
  },
};

const defaultTransition = {
  property: 'all',
  duration: 300,
  timingfunction: 'linear',
};

const stopPropagation = (e) => e.stopPropagation();

let onClose;

@observer
export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  static propTypes = {
    onRequestClose: React.PropTypes.func,
    effect: React.PropTypes.object,
    style: React.PropTypes.object,
    children: React.PropTypes.object,
  }

  close() {
    if (!this.props.onRequestClose || this.props.onRequestClose()) {
      ModalManager.close();
    }
  }

  handleKeyDown(event) {
    if (event.keyCode === 27 /* esc*/) this.close();
  }

  componentDidMount() {
    const transitionTimeMS = this.getTransitionDuration();
    setTimeout(() => this.setState({open: true}), 0);
    onClose = (callback) => {
      this.setState({open: false}, () => {
        this.closeTimer = setTimeout(callback, transitionTimeMS);
      });
    };
  }

  componentWillUnmount() {
    onClose = null;
    clearTimeout(this.closeTimer);
  }

  getTransitionDuration() {
    const { effect } = this.props;
    if (!effect.transition) {
      return defaultTransition.duration;
    }
    return effect.transition.duration || defaultTransition.duration;
  }

  render() {
    const { style, effect } = this.props;
    const { open } = this.state;

    let transition = effect.transition;
    if (!transition) {
      transition = defaultTransition;
    }
    else {
      transition = Assign({}, defaultTransition, transition);
    }

    const transitionStyle = {
      transition: `${ transition.property } ${ transition.duration / 300 } s ${ transition.timingfunction }`,
    };

    return (
      <div
        ref="overlay"
        style={prefix(Assign({}, defaultStyles.overlay, style ? style.overlay ? style.overlay : {} : {}, { transition: 'opacity ' + transition.duration / 1000 + 's' + ' linear', opacity: open ? 1 : 0 }))}
        onClick={this.close.bind(this)}>

        <div
          ref="content"
          style={prefix(Assign({}, defaultStyles.content, style ? style.content ? style.content : {} : {}, transitionStyle, open ? effect.end : effect.begin))}
          onClick={stopPropagation}
          onKeyDown={this.handleKeyDown.bind(this)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

let node;
const modals = [];

const renderModal = () => {
  if (modals.length === 0) return;
  const component = <MuiThemeProvider muiTheme={muiTheme}>
    { modals.shift() }
  </MuiThemeProvider>;
  if (!node) {
    node = document.createElement('div');
    document.body.appendChild(node);
  }
  ReactDOM.render(component, node);
};

export const ModalManager = {
  open(component) {
    modals.push(component);
    if (modals.length === 1) { // render the modal only if there is no other showing modals
      renderModal();
    }
  },
  close() {
    onClose && onClose(() => {
      ReactDOM.unmountComponentAtNode(node);
      renderModal();// render the other modals which are waiting.
    });
  },
};

