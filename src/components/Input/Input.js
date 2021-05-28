import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Input = ({ inputRef, ...rest }) => {
  return <input ref={inputRef} {...rest} />;
};

Input.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default Input;
