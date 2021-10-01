import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import authService from "../services/authService";
import { registerUser } from "../services/userService";

class Register extends Form {
	state = {
		data: { username: "", password: "", name: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().email().required().label("Username"),
		password: Joi.string().min(5).required().label("Password"),
		name: Joi.string().required().label("Name"),
	};

	doSubmit = async () => {
		try {
			const { headers } = await registerUser(this.state.data);
			authService.loginWithJwt(headers["x-auth-token"]);
			window.location = "/";
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({ errors });
			}
		}
	};
	render() {
		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username", "email")}
					{this.renderInput("password", "Password", "password")}
					{this.renderInput("name", "Name", "text")}
					{this.renderButton("Register")}
				</form>
			</div>
		);
	}
}

export default Register;
