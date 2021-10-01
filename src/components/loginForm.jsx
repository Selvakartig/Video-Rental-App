import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import authService from "../services/authService";
import { Redirect } from "react-router";

class LoginForm extends Form {
	state = {
		data: { username: "", password: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	};

	doSubmit = async () => {
		try {
			await authService.login(this.state.data);
			const { state } = this.props.location;
			window.location = state ? state.from.pathname : "/";
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		if (authService.getCurrentUser()) return <Redirect to="/" />;
		return (
			<div>
				<h1>Login Page</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username", "text")}
					{this.renderInput("password", "Password", "password")}
					{this.renderButton("Login")}
				</form>
			</div>
		);
	}
}

export default LoginForm;
