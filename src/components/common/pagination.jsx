import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = (props) => {
	const { movieCount, perPage, currentPage, onPageChange } = props;
	const pageCount = Math.ceil(movieCount / perPage);
	const pages = _.range(1, pageCount + 1);

	if (pageCount === 1) return null;

	return (
		<nav>
			<ul className="pagination">
				{pages.map((page) => (
					<li
						key={page}
						className={page === currentPage ? "page-item active" : "page-item"}
					>
						{/* eslint-disable-next-line*/}
						<a className="page-link" onClick={() => onPageChange(page)}>
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	movieCount: PropTypes.number.isRequired,
	perPage: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
