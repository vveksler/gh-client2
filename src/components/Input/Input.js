import React from "react";

import "./styles.css";

const Input = ({ searchInput, ...rest }) => {
  return <input ref={searchInput} {...rest} />;
};

export default Input;
