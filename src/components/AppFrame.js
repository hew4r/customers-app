import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from "./AppHeader";

const AppFrame = ({ header, body }) => {
  return (
    <div>
      <div className="app-frame">
        <AppHeader title={header}/>
        <div>{body}</div>
        <div>Aplicacion simple de ejemplo</div>
      </div>
    </div>
  );
};

AppFrame.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.element.isRequired, //algo que se puede renderizar
};

export default AppFrame;

