import React from "react";
import HousesList from "./houses-list";
import Character from "./character";
import NotFound from "./not-found/NotFound";
import {Redirect, Route, Switch} from "react-router-dom";

function App() {
	return (<div>
		<Switch>
			<Redirect from="/" exact to="/houses" />
			<Route path="/houses" component={HousesList} exact/>
			<Route path="/houses/:page" component={HousesList}/>
			<Route path="/people/:id" component={Character}/>
			<Route component={NotFound} />
		</Switch>
	</div>);
}

export default App;
