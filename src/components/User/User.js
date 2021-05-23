import React from "react";
import UserInfo from "../UserInfo/UserInfo";

import UserRepos from "../UserRepos";

import "./styles.css";

const User = ({
  user,
  repos: { data },
  onChangeOffset,
  perPage,
  currentPage,
  onPageChange,
  loadingUserInfo,
  loadingUserRepos,
}) => {
  const { public_repos, login } = user;

  return (
    <div className="app-user">
      <UserInfo user={user} loadinState={loadingUserInfo} />
      <div className="app-user__content">
        <UserRepos
          login={login}
          data={data}
          perPage={perPage}
          public_repos={public_repos}
          currentPage={currentPage}
          onPageChange={onPageChange}
          onChangeOffset={onChangeOffset}
          loadinState={loadingUserRepos}
        />
      </div>
    </div>
  );
};

export default User;
