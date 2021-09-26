import React from "react";
import Joi from "joi-browser";
import InputField from "./inputField";
import SelectField from "./selectField";

class Form extends React.Component {
	state = {
		data: {},
		errors: {},
	};

	validate = () => {
		const result = Joi.validate(this.state.data, this.schema, {
			abortEarly: false,
		});

		if (!result.error) return null;

		const errors = {};

		result.error.details.map((err) => (errors[err.context.key] = err.message));
		return errors;
	};

	validateProperty = (target) => {
		const obj = { [target.name]: target.value };
		const schema = { [target.name]: this.schema[target.name] };
		const result = Joi.validate(obj, schema);
		return result.error ? result.error.details[0].message : null;
	};

	handleChange = ({ target }) => {
		const errors = { ...this.state.errors };
		const errorMsg = this.validateProperty(target);
		if (errorMsg) errors[target.name] = errorMsg;
		else delete errors[target.name];

		const data = { ...this.state.data };
		data[target.name] = target.value;
		this.setState({ data, errors });
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	renderInput = (name, label, type) => {
		const { data, errors } = this.state;

		return (
			<InputField
				type={type}
				name={name}
				label={label}
				value={data[name]}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	};

	renderSelect = (name, label, options) => {
		const { data, errors } = this.state;

		return (
			<SelectField
				name={name}
				label={label}
				value={data[name]}
				options={options}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	};

	renderButton = (label) => {
		return <button className="btn btn-primary">{label}</button>;
	};
}

export default Form;
