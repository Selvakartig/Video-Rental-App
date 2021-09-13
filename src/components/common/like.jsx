import React from "react";

const Like = (props) => {
	let likeClass = "fa fa-heart";
	if (!props.liked) likeClass += "-o";
	return (
		<i
			onClick={props.onClick}
			className={likeClass}
			aria-hidden="true"
			style={{ cursor: "pointer" }}
		></i>
	);
};

export default Like;
