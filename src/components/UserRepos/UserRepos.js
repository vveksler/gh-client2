import React from "react";
import PropTypes from "prop-types";

// components
import ReposItem from "../ReposItem";
import Loader from "../Loader";

// icons
import empty from "../../assets/icons/empty.svg";

import "./styles.css";

const UserRepos = ({ repos: { data }, public_repos, loadinState }) => {
  if (!data.length) {
    return (
      <div className="app-user-repos__not-found">
        <img src={empty} className="emty-repos-icon" alt="no repositories" />
        <p className="app-main__text">Repository list is empty</p>
      </div>
    );
  }

  return (
    <div className="app-user-repos">
      {loadinState ? (
        <Loader />
      ) : (
        <>
          <h2 className="app-user-repos__title">
            Repositories ({public_repos})
          </h2>
          <ul className="app-user-repos__list">
            {data.map((item) => (
              <ReposItem
                key={item.id}
                name={item.name}
                description={item.description}
                html_url={item.html_url}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

UserRepos.propTypes = {
  repos: PropTypes.shape({
    data: PropTypes.array,
  }),
  public_repos: PropTypes.number,
  loadinState: PropTypes.bool,
};

export default UserRepos;
