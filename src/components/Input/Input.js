import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Input = ({ inputRef, className, ...rest }) => {
  const classes = className ? `app-input ${className}` : "app-input";

  return <input className={classes} ref={inputRef} {...rest} />;
};

Input.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

Input.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default Input;
