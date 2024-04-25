import PropTypes from 'prop-types';
// eslint-disable-next-line
import React from 'react';

const CustomButton = ({ onClick, children }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {children}
    </button>
  );
};

CustomButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  };

export default CustomButton;