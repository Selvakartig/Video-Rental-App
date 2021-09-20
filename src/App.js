import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<NavBar />
				<div className="container">
					<Switch>
						<Route path="/movies/:id" component={MovieForm}></Route>
						<Route path="/movies" component={Movies}></Route>
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
