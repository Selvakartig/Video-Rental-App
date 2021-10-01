import jwtDecode from "jwt-decode";
import httpServices from "./httpServices";
import config from "../config.json";

const apiEndPoint = config.apiURL + "/auth";
const tokenKey = "token";

httpServices.setJwt(getJwt());

export async function login(user) {
	const { data: jwt } = await httpServices.post(apiEndPoint, {
		email: user.username,
		password: user.password,
	});
	localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
	localStorage.setItem(tokenKey, jwt);
}

export function logout() {
	localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey);
		return jwtDecode(jwt);
	} catch (ex) {
		return null;
	}
}

export function getJwt() {
	return localStorage.getItem(tokenKey);
}

// eslint-disable-next-line
export default {
	login,
	loginWithJwt,
	logout,
	getCurrentUser,
};
