import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const ReposItem = ({ name, description, html_url }) => {
  return (
    <li className="app-user-repos__item">
      <a
        href={html_url}
        className="app-user-repos__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>
      <div className="app-user-repos__desc">{description}</div>
    </li>
  );
};

ReposItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  html_url: PropTypes.string,
};

export default ReposItem;
