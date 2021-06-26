import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Dashboard from './SystemApp';
import ProcessApp from './ProcessApp';

const App = () => {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/">
						<Redirect to="/system" />
					</Route>
					<Route path="/system" component={Dashboard} />
					<Route path="/process" component={ProcessApp} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
