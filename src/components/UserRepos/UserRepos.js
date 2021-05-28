import React from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

// components
import Loader from "../Loader";
import ReposItem from "../ReposItem";

// icons
import empty from "../../assets/icons/empty.svg";

import "./styles.css";

const UserRepos = ({
  repos: { data },
  public_repos,
  perPage,
  currentPage,
  fetchReposPerPage,
  loadinState,
}) => {
  const handlePageClick = (page) => {
    fetchReposPerPage(page.selected);
  };

  if (loadinState) {
    return <Loader />;
  }

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
      {data && (
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
      <div className="app-user-repos__pagination">
        <ReactPaginate
          forcePage={currentPage}
          marginPagesDisplayed={0}
          pageRangeDisplayed={perPage}
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={public_repos / perPage}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

UserRepos.propTypes = {
  repos: PropTypes.shape({
    data: PropTypes.array,
  }),
  public_repos: PropTypes.number,
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
  fetchReposPerPage: PropTypes.func,
  loadinState: PropTypes.bool,
};

export default UserRepos;
