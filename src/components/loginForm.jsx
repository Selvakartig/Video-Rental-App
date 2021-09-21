import React from "react";
import InputField from "./common/inputField";

class LoginForm extends React.Component {
	state = {
		account: { username: "", password: "" },
		errors: {},
	};

	validate = () => {
		const errors = {};

		const { account } = this.state;
		if (account.username.trim() === "") {
			errors.username = "Username is empty";
		}
		if (account.password.trim() === "") {
			errors.password = "Password is empty";
		}
		return Object.keys(errors).length === 0 ? null : errors;
	};

	validateProperty = (target) => {
		if (target.name === "username") {
			if (target.value.trim() === "") {
				return "Username is empty";
			}
		}
		if (target.name === "password") {
			if (target.value.trim() === "") {
				return "Password is empty";
			}
		}
	};

	handleChange = ({ target }) => {
		const errors = { ...this.state.errors };
		const errorMsg = this.validateProperty(target);
		if (errorMsg) errors[target.name] = errorMsg;
		else delete errors[target.name];

		const account = { ...this.state.account };
		account[target.name] = target.value;
		this.setState({ account, errors });
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		// server call
		console.log("Submitted!");
	};

	render() {
		const { account, errors } = this.state;
		return (
			<div>
				<h1>Login Page</h1>
				<form onSubmit={this.handleSubmit}>
					<InputField
						autofocus={true}
						type="text"
						name="username"
						label="Username"
						value={account.username}
						onChange={this.handleChange}
						error={errors.username}
					/>
					<InputField
						type="password"
						name="password"
						label="Password"
						value={account.password}
						onChange={this.handleChange}
						autocomplete="on"
						error={errors.password}
					/>
					<button className="btn btn-primary">Login</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
