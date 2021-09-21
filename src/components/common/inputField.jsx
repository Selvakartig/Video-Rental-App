import React from "react";

const InputField = (props) => {
	const { type, name, label, autofocus, autocomplete, error, value, onChange } =
		props;
	return (
		<div className="mb-3">
			<label htmlFor={name} className="form-label">
				{label}
			</label>
			<input
				autoFocus={autofocus}
				type={type}
				className="form-control"
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				autoComplete={autocomplete}
			/>
			{error && <div className="alert alert-danger mt-2 p-0">{error}</div>}
		</div>
	);
};

export default InputField;
