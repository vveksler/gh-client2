import React from "react";

import Input from "../Input";
import github from "../../assets/icons/github.svg";

import "./styles.css";

const Header = ({ searchInput, handleChange, handleKeyPress }) => {
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
          searchInput={searchInput}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="app-input-search"
          placeholder="Enter GitHub username"
        />
      </div>
    </div>
  );
};

export default Header;
