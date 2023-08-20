import * as React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link, Redirect
} from "react-router-dom";
import "./App.scss";
import MainComponent from "./components/structure/MainComponent";

export default function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" component={MainComponent} />
				<Redirect from="/" to="/login" />
			</Switch>
		</Router>
	);
}


