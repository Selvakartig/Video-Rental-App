import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class Register extends Form {
	state = {
		data: { username: "", password: "", name: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().email().required().label("Username"),
		password: Joi.string().min(3).required().label("Password"),
		name: Joi.string().required().label("Name"),
	};

	doSubmit = () => {
		// server call
		console.log("Submitted!");
		// this.props.history.replace("/login");
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
