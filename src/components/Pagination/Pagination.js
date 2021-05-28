import React from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

import "./styles.css";

const Pagination = ({
  currentPage,
  perPage,
  public_repos,
  fetchReposPerPage,
}) => {
  const handlePageChange = (page) => {
    fetchReposPerPage(page.selected);
  };

  return (
    <ReactPaginate
      forcePage={currentPage}
      marginPagesDisplayed={0}
      pageRangeDisplayed={perPage}
      previousLabel={"<"}
      nextLabel={">"}
      pageCount={public_repos / perPage}
      onPageChange={handlePageChange}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
  public_repos: PropTypes.number,
  fetchReposPerPage: PropTypes.func,
};

export default Pagination;
