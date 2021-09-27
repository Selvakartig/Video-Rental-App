import httpServices from "./httpServices";
import config from "../config.json";

const apiEndPoint = config.apiURL + "/movies";

export function getMovies() {
	return httpServices.get(apiEndPoint);
}

export async function getMovie(id) {
	return httpServices.get(apiEndPoint + "/" + id);
}

export function deleteMovie(movieId) {
	return httpServices.delete(apiEndPoint + "/" + movieId);
}

export async function saveMovie(movie) {
	if (movie._id) {
		const body = { ...movie };
		delete body._id;
		return httpServices.put(apiEndPoint + "/" + movie._id, body);
	}
	return httpServices.post(apiEndPoint, movie);
}
