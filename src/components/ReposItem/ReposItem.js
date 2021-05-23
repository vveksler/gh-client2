import React from "react";

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

export default ReposItem;
