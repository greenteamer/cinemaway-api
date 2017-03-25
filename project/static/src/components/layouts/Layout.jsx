import React from 'react';


const Layout = ({content, nav}) => {
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
  </div>;
};

Layout.propTypes = {
  content: React.PropTypes.element,
  nav: React.PropTypes.element,
};

export default Layout;
