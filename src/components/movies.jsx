import React from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import _ from "lodash";

class Movies extends React.Component {
	state = {
		movieList: [],
		genres: [],
		perPage: 4,
		currentPage: 1,
		searchQuery: "",
		selectedGenre: null,
		sortColumn: { path: "title", order: "asc" },
	};

	componentDidMount() {
		const genre = [{ _id: "", name: "All Movies" }, ...getGenres()];
		this.setState({ movieList: getMovies(), genres: genre });
	}

	handleLike = (m) => {
		const newLike = this.state.movieList.map((movie) => {
			if (movie._id === m._id) {
				const like = movie.liked === true ? false : true;
				movie.liked = like;
			}
			return movie;
		});
		this.setState({ movieList: newLike });
	};

	handleDelete = (movie) => {
		let newMovieList = this.state.movieList.filter((e) => e._id !== movie._id);
		this.setState({ movieList: newMovieList });
	};

	handlePageChange = (pageNumber) => {
		this.setState({ currentPage: pageNumber });
	};

	handleGenres = (genre) => {
		this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
	};

	handleSearch = (query) => {
		this.setState({
			searchQuery: query,
			selectedGenre: null,
			currentPage: 1,
		});
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	getPagedData = () => {
		const {
			perPage,
			currentPage,
			sortColumn,
			selectedGenre,
			searchQuery,
			movieList: allMovie,
		} = this.state;

		let filteredMovie = allMovie;
		if (searchQuery) {
			filteredMovie = allMovie.filter((m) =>
				m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		} else if (selectedGenre && selectedGenre._id) {
			filteredMovie = allMovie.filter((m) => m.genre._id === selectedGenre._id);
		}

		const sortedMovie = _.orderBy(
			filteredMovie,
			[sortColumn.path],
			[sortColumn.order]
		);

		const movieList = paginate(sortedMovie, currentPage, perPage);

		return { totalCount: filteredMovie.length, data: movieList };
	};

	render() {
		const { length } = this.state.movieList;

		const { perPage, currentPage, sortColumn } = this.state;

		if (length === 0) {
			return (
				<div className="container">
					<p className="p-3">There are no movies in the Database!</p>
				</div>
			);
		}

		const { totalCount, data: movieList } = this.getPagedData();

		return (
			<div className="row">
				<div className="col-2">
					<ListGroup
						genres={this.state.genres}
						handleGenres={this.handleGenres}
						selectedGenre={this.state.selectedGenre}
					/>
				</div>
				<div className="col">
					<Link to={"/movies/new"} className="btn btn-primary">
						New Movie
					</Link>
					<p className="pt-3">There are {totalCount} movies in the Database</p>

					<SearchBox
						value={this.state.searchQuery}
						onChange={this.handleSearch}
					/>

					<MoviesTable
						movieList={movieList}
						sortColumn={sortColumn}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>

					<Pagination
						movieCount={totalCount}
						perPage={perPage}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
