import React, { useState } from "react";
import PropTypes from "prop-types";

// components
import Input from "../Input";

// icons
import github from "../../assets/icons/github.svg";

import "./styles.css";

const Header = ({ searchInputRef, fetchData }) => {
  const [value, setValue] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && value !== "") {
      fetchData(value);
    }
  };

  return (
    <div className="app-header">
      <a
        className="app-header__link"
        href="https://github.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={github} className="github-icon" alt="github" />
      </a>
      <div className="app-header__input">
        <Input
          value={value}
          placeholder="Enter GitHub username"
          inputRef={searchInputRef}
          onChange={(event) => setValue(event.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

Header.propTypes = {
  searchInputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  fetchData: PropTypes.func,
};

export default Header;
