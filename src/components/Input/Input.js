import React from "react";

import "./styles.css";

const Input = ({ inputRef, ...rest }) => {
  return <input ref={inputRef} {...rest} />;
};

export default Input;
