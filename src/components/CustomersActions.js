import React from 'react';
import PropTypes from 'prop-types';

const CustomersActions = ({ children }) => {
  
  return (
    <div>
      
      <div className="customers-actions">
        <div>{children}</div>
      </div>
    </div>
  );
};

//nodo, involucra cualquier tipo de elemento renderizable que react nos permita
CustomersActions.propTypes = {
  children: PropTypes.node.isRequired,
  
};

export default CustomersActions;