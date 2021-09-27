import httpServices from "../services/httpServices";
import config from "../config.json";

export const { data: genres } = httpServices.get(config.apiURL + "/genres");

export function getGenres() {
	return httpServices.get(config.apiURL + "/genres");
}
