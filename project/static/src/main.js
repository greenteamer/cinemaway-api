// styles
// import '../bower_components/bootstrap/scss/bootstrap.scss';
// import '../bower_components/bootstrap-material-design/dist/bootstrap-material-design.min.css';
import '../bootstrap/bootstrap.scss';
import './styles/base.sass';
import './styles/tachyons.css';
import './styles/_px_sizing.sass';
import './styles/_rem_sizing.sass';
import './styles/geosuggest.css';
// libs
// import '../bower_components/bootstrap-material-design/js/base';
// import '../bower_components/bootstrap-material-design/dist/js/material';
// import '../bower_components/bootstrap-material-design/dist/js/ripples';

import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './styles/muiTheme';
import Router from './routes';
// import DevTools from 'mobx-react-devtools';


const App = () => <MuiThemeProvider muiTheme={muiTheme}>
  <Router />
</MuiThemeProvider>;

render(
  <App />,
  document.getElementById('react'),
);

// render(
//   <DevTools />,
//   document.getElementById('devtools'),
// );
