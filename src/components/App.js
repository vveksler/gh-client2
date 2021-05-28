import React, { useState, useRef } from "react";
import { Octokit } from "@octokit/rest";

// components
import Header from "./Header";
import User from "./User";
import Loader from "./Loader";

// icons
import search from "../assets/icons/search.svg";
import notFound from "../assets/icons/user-not-found.svg";

import "./App.css";

const octokit = new Octokit();
const initPage = 0;
const perPage = 4;

const App = () => {
  const searchInputRef = useRef(null);

  const [initialState, setInitialState] = useState(true);
  const [currentPage, setCurrentPage] = useState(initPage);

  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState({ data: [] });

  const [loadingUserInfo, setLoadingUserInfo] = useState(false);
  const [loadingUserRepos, setLoadingUserRepos] = useState(false);

  async function fetchData(username) {
    try {
      if (initialState) {
        setInitialState(false);
      } else {
        setCurrentPage(initPage);
      }

      setLoadingUserInfo(true);
      setLoadingUserRepos(true);
      const user = await octokit.request("GET /users/{username}", {
        username,
      });
      setLoadingUserInfo(false);

      if (user && user.status === 200) {
        setUser(user.data);
      }

      const repos = await octokit.request("GET /users/{username}/repos", {
        username: username,
        per_page: perPage,
        page: initPage + 1,
      });
      setLoadingUserRepos(false);

      if (repos && repos.data) {
        setRepos({ data: repos.data });
      }
    } catch (error) {
      // User not found
      setLoadingUserInfo(false);
      setLoadingUserRepos(false);
      setUser(null);
      setRepos({ data: [] });
    }
  }

  async function fetchReposPerPage(page) {
    try {
      setLoadingUserRepos(true);
      const repos = await octokit.request("GET /users/{username}/repos", {
        username: user.login,
        per_page: perPage,
        page: page + 1,
      });
      setLoadingUserRepos(false);

      if (repos && repos.data) {
        setRepos({ data: repos.data });
        setCurrentPage(page);
      }
    } catch (error) {
      setLoadingUserRepos(false);
      setRepos({ data: [] });
      setCurrentPage(initPage);
    }
  }

  function renderMainSection() {
    if (initialState) {
      return (
        <div
          className="app-main__search"
          onClick={() => searchInputRef.current.focus()}
        >
          <img src={search} className="search-icon" alt="search" />
          <p className="app-main__text">Start with searching a GitHub user</p>
        </div>
      );
    }

    if (user) {
      return (
        <User
          user={user}
          repos={repos}
          perPage={perPage}
          fetchReposPerPage={fetchReposPerPage}
          currentPage={currentPage}
          loadingUserInfo={loadingUserInfo}
          loadingUserRepos={loadingUserRepos}
        />
      );
    }

    if (loadingUserInfo || loadingUserRepos) {
      return <Loader />;
    } else {
      return (
        <div className="app-main__user-not-found">
          <img
            src={notFound}
            className="user-not-found-icon"
            alt="user not found"
          />
          <p className="app-main__text">User not found</p>
        </div>
      );
    }
  }

  return (
    <div className="wrapper">
      <Header searchInputRef={searchInputRef} fetchData={fetchData} />
      <div className="app-main">{renderMainSection()}</div>
    </div>
  );
};

export default App;
