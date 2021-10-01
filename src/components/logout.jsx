import authService from "../services/authService";

const Logout = () => {
	authService.logout();
	window.location.href = "/";
	return null;
};

export default Logout;
