import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					VIDLY
				</Link>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link" to="/movies">
								Movies
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/customers">
								Customers
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/rentals">
								Rentals
							</NavLink>
						</li>
						{!user && (
							<React.Fragment>
								<li className="nav-item">
									<NavLink className="nav-link" to="/login">
										Login
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/register">
										Register
									</NavLink>
								</li>
							</React.Fragment>
						)}
						{user && (
							<React.Fragment>
								<li className="nav-item">
									<NavLink className="nav-link" to="/profile">
										{user.name}
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/logout">
										Logout
									</NavLink>
								</li>
							</React.Fragment>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
