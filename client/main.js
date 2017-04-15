import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Landing from './components/landing/landing';
import MainLanding from './components/landing/main/main_landing';

import Page from './components/page/page';
import MainPage from './components/page/main/main_page';
import DealsPage from './components/page/deals/deals_page';
import FeedbackPage from './components/page/feedback/feedback_page';
import ManagePage from './components/page/manage/manage_page';

import User from './components/user/user';
import UserMap from './components/user/main/user_map';
import MainUser from './components/user/main/main_user';
import BookUser from './components/user/main/book_user';
import FeedbackUser from './components/user/main/feedback_user';
import FeedbackUserPage from './components/user/main/feedback_user_page';

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={Landing}>
			<IndexRoute component={MainLanding} />
		</Route>
		<Route path="/page/" component={Page}>
			<IndexRoute component={MainPage} />
			<Route path="deals/" component={DealsPage} />
			<Route path="feedback/" component={FeedbackPage} />
			<Route path="manage/" component={ManagePage} />
		</Route>
		<Route path="/user/" component={User}>
			<IndexRoute component={MainUser} />
			<Route path="map/" component={UserMap} />
			<Route path="map/p/:pageID/" component={UserMap}/>
			<Route path="book/" component={BookUser}/>
			<Route path="feedback/" component={FeedbackUser}/>
			<Route path="feedback/:pageID/" component={FeedbackUserPage}/>
		</Route>
	</Router>
);

Meteor.startup(() => {
	Stripe.setPublishableKey(Meteor.settings.public.StripePub);
	ReactDOM.render(routes, document.querySelector('.render-target'));
});
