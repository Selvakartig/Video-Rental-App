import httpServices from "./httpServices";
import config from "../config.json";

const apiEndPoint = config.apiURL + "/users";

export function registerUser(user) {
	return httpServices.post(apiEndPoint, {
		email: user.username,
		password: user.password,
		name: user.name,
	});
}
