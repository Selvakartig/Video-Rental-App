import React from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends React.Component {
	columns = [
		{
			path: "title",
			label: "Title",
			content: (movie) => (
				<Link to={`/movies/${movie._id}`}>{movie.title}</Link>
			),
		},
		{ path: "genre.name", label: "Genre" },
		{ path: "numberInStock", label: "Stock" },
		{ path: "dailyRentalRate", label: "Rate" },
		{
			key: "like",
			content: (movie) => (
				<Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
			),
		},
	];

	deleteButton = {
		key: "delete",
		content: (movie) => (
			<button
				className="btn btn-danger btn-sm"
				onClick={() => this.props.onDelete(movie)}
			>
				Delete
			</button>
		),
	};

	constructor() {
		super();
		const user = authService.getCurrentUser();
		if (user && user.isAdmin) {
			this.columns.push(this.deleteButton);
		}
	}
	render() {
		const { movieList, onSort, sortColumn } = this.props;
		return (
			<Table
				data={movieList}
				columns={this.columns}
				onSort={onSort}
				sortColumn={sortColumn}
			/>
		);
	}
}

export default MoviesTable;
