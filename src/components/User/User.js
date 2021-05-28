import React from "react";
import PropTypes from "prop-types";

// components
import UserInfo from "../UserInfo/UserInfo";
import UserRepos from "../UserRepos";

import "./styles.css";

const User = ({
  user,
  repos,
  perPage,
  currentPage,
  fetchReposPerPage,
  loadingUserInfo,
  loadingUserRepos,
}) => {
  const {
    name,
    login,
    avatar_url,
    html_url,
    followers,
    following,
    public_repos,
  } = user;

  return (
    <div className="app-user">
      <UserInfo
        name={name}
        login={login}
        avatar_url={avatar_url}
        html_url={html_url}
        followers={followers}
        following={following}
        loadinState={loadingUserInfo}
      />
      <div className="app-user__content">
        <UserRepos
          repos={repos}
          perPage={perPage}
          public_repos={public_repos}
          currentPage={currentPage}
          fetchReposPerPage={fetchReposPerPage}
          loadinState={loadingUserRepos}
        />
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.any,
  repos: PropTypes.shape({
    data: PropTypes.array,
  }),
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
  fetchReposPerPage: PropTypes.func,
  loadingUserInfo: PropTypes.bool,
  loadingUserRepos: PropTypes.bool,
};

export default User;
