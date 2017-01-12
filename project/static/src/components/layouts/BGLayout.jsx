import React from 'react';


export default function Layout({content}) {
  return <div id="auth-page" className="flex-center">
    {content}
  </div>;
}

Layout.propTypes = {
  content: React.PropTypes.element,
  menu: React.PropTypes.element,
};
