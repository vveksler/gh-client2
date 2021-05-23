import React, { useState } from "react";

import Input from "../Input";
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
          className="app-input-search"
          placeholder="Enter GitHub username"
          value={value}
          inputRef={searchInputRef}
          onChange={(event) => setValue(event.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default Header;
