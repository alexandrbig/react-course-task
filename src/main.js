import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import createStore from "./store";
import App from "./components/app";
import history from "./history";

const store = createStore();

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App/>
		</ConnectedRouter>
	</Provider>,
	document.getElementById("app")
);
