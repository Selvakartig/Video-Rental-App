import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Register from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import authService from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

class App extends React.Component {
	state = {};

	componentDidMount() {
		const currentUser = authService.getCurrentUser();
		this.setState({ currentUser });
	}
	render() {
		return (
			<React.Fragment>
				<ToastContainer />
				<NavBar user={this.state.currentUser} />
				<div className="container">
					<Switch>
						<Route path="/register" component={Register}></Route>
						<Route path="/login" component={LoginForm}></Route>
						<Route path="/logout" component={Logout}></Route>
						<Route path="/movies/movieForm" component={MovieForm}></Route>
						<ProtectedRoute path="/movies/:id" component={MovieForm} />
						<Route
							path="/movies"
							render={(props) => (
								<Movies {...props} currentUser={this.state.currentUser} />
							)}
						></Route>
						<Route path="/customers" component={Customers}></Route>
						<Route path="/rentals" component={Rentals}></Route>
						<Route path="/not-found" component={NotFound}></Route>
						<Redirect from="/" exact to="/movies" />
						<Redirect to="/not-found" />
					</Switch>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
