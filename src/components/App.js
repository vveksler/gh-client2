import React, { useState, useRef } from "react";
import { Octokit } from "@octokit/rest";

import Header from "./Header";
import User from "./User";

import search from "../assets/icons/search.svg";
import notFound from "../assets/icons/user-not-found.svg";

import "./App.css";
import Loader from "./Loader";

const octokit = new Octokit();
const initPage = 0;
const perPage = 4;

const App = () => {
  const searchInput = useRef(null);

  const [initialState, setInitialState] = useState(true);
  const [value, setValue] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState({ data: [], offset: 0 });

  const [loadingUserInfo, setLoadingUserInfo] = useState(false);
  const [loadingUserRepos, setLoadingUserRepos] = useState(false);

  const [currentPage, setCurrentPage] = useState(initPage);

  function onSearchClick() {
    searchInput.current.focus();
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  async function handleKeyPress(event) {
    if (event.key === "Enter" && value !== "") {
      setInitialState(false);
      await fetchData(value);
    }
  }

  async function fetchData(username) {
    try {
      setLoadingUserInfo(true);
      setLoadingUserRepos(true);
      const user = await octokit.request("GET /users/{username}", {
        username,
      });

      if (user && user.status === 200) {
        setUser(user.data);
      }
      setLoadingUserInfo(false);

      const repos = await octokit.request("GET /users/{username}/repos", {
        username: username,
        per_page: perPage,
        page: 1,
      });

      if (repos && repos.data) {
        setRepos({ data: repos.data });
      }
      setLoadingUserRepos(false);
    } catch (error) {
      // User not found
      setLoadingUserInfo(false);
      setLoadingUserRepos(false);
      setUser(null);
      setRepos({ data: [], offset: 0 });
    }
  }

  async function fetchReposPerPage(username, offset, page) {
    try {
      setLoadingUserRepos(true);
      const repos = await octokit.request("GET /users/{username}/repos", {
        username,
        per_page: perPage,
        page: page === 0 ? 1 : page,
      });

      if (repos && repos.data) {
        setRepos({ data: repos.data, offset });
      }
      setLoadingUserRepos(false);
    } catch (error) {
      setLoadingUserRepos(false);
      setRepos({ data: [], offset: 0 });
    }
  }

  const renderMainSection = () => {
    if (initialState) {
      return (
        <div className="app-main__search" onClick={onSearchClick}>
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
          onChangeOffset={fetchReposPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
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
  };

  return (
    <div className="wrapper">
      <Header
        searchInput={searchInput}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
      />
      <div className="app-main">{renderMainSection()}</div>
    </div>
  );
};

export default App;
