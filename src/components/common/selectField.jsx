import React from "react";

const SelectField = (props) => {
	const { name, label, options, error, value, onChange } = props;
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<select
				name={name}
				id={name}
				onChange={onChange}
				className="form-control"
				value={value}
			>
				<option value="" />
				{options.map((option) => (
					<option key={option._id} value={option._id}>
						{option.name}
					</option>
				))}
			</select>
			{error && <div className="alert alert-danger mt-2 p-0">{error}</div>}
		</div>
	);
};

export default SelectField;
