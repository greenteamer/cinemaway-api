import React from 'react';
import { observer } from 'mobx-react';
import Snackbar from 'material-ui/Snackbar';
import uiStore from '../../stores/UIStore';


const Layout = observer(({content, nav}) => {
  return <div className="container">
    <div className="row">
      <div className="col-md-12">
        {nav}
      </div>
      <div className="col-md-12">
        {content}
      </div>
      <div className="col-sm-12 mt2">
        <div className="bg-dark-gray white pa2">
          Техническая поддержка: support@cinemaway.ru
        </div>
      </div>
    </div>
    <Snackbar
      open={uiStore.snackbar.open}
      message={uiStore.snackbar.message}
      autoHideDuration={4000}
    />
  </div>;
});

Layout.propTypes = {
  content: React.PropTypes.element,
  nav: React.PropTypes.element,
};

export default Layout;
