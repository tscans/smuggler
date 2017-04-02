import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Landing from './components/landing/landing';
import MainLanding from './components/landing/main/main_landing';

import Page from './components/page/page';
import MainPage from './components/page/main/main_page';

import User from './components/user/user';
import MainUser from './components/user/main/main_user';


// function requireAuth(nextState, replace) {
// 	if (!Meteor.userId()) {
// 		null
// 	}
// }


const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={Landing}>
			<IndexRoute component={MainLanding} />
		</Route>
		<Route path="/page/" component={Page}>
			<IndexRoute component={MainPage} />
		</Route>
		<Route path="/user/" component={User}>
			<IndexRoute component={MainUser} />
		</Route>
	</Router>
);

Meteor.startup(() => {
	Stripe.setPublishableKey(Meteor.settings.public.StripePub);
	ReactDOM.render(routes, document.querySelector('.render-target'));
});
