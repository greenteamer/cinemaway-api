import React from 'react';


export default function Layout({content, nav}) {
  return <div className="container">
    <div className="row">
      <div className="col-md-12">
          {nav}
      </div>
      <div className="col-md-12">
          {content}
      </div>
    </div>
  </div>;
}

Layout.propTypes = {
  content: React.PropTypes.element,
  menu: React.PropTypes.element,
};
