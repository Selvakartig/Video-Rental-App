import React from "react";

const MovieForm = (props) => {
	const handleSave = () => {
		props.history.replace("/movies");
	};
	return (
		<React.Fragment>
			<h1>Movies Form Page - {props.match.params.id}</h1>
			<button className="btn btn-primary btn-sm" onClick={handleSave}>
				Save
			</button>
		</React.Fragment>
	);
};

export default MovieForm;
