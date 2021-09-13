import React from "react";

const ListGroup = (props) => {
	const { genres, textProperty, valueProperty, handleGenres, selectedGenre } =
		props;
	return (
		<ul className="list-group">
			{genres.map((genres) => (
				<li
					key={genres[valueProperty]}
					className={
						genres === selectedGenre
							? "list-group-item active"
							: "list-group-item"
					}
					onClick={() => handleGenres(genres)}
				>
					{genres[textProperty]}
				</li>
			))}
		</ul>
	);
};

ListGroup.defaultProps = {
	textProperty: "name",
	valueProperty: "_id",
};

export default ListGroup;
