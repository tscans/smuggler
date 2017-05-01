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
import Update from './components/page/update/update';
import PageVerify from './components/page/verify/page_verify';

import User from './components/user/user';
import PagesList from './components/user/main/list/pages_list';
import UserMap from './components/user/main/user_map';
import MainUser from './components/user/main/main_user';

import Admin from './components/admin/admin';
import MainAdmin from './components/admin/main/main_admin';

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={Landing}>
			<IndexRoute component={MainLanding} />
		</Route>
		<Route path="/page/" component={Page}>
			<IndexRoute component={MainPage} />
			<Route path="verify/" component={PageVerify}/>
			<Route path="deals/" component={DealsPage} />
			<Route path="feedback/" component={FeedbackPage} />
			<Route path="manage/" component={ManagePage} />
			<Route path="update/" component={Update}/>
		</Route>
		<Route path="/user/" component={User}>
			<IndexRoute component={MainUser} />
			<Route path="d/" component={MainUser}/>
			<Route path="d/:dealID/" component={MainUser}/>
			<Route path="p/" component={PagesList}/>
			<Route path="p/:pageID/" component={PagesList}/>
			<Route path="map/" component={UserMap} />
			<Route path="map/p/:pageID/" component={UserMap}/>
		</Route>
		<Route path="/admin/" component={Admin}>
			<IndexRoute component={MainAdmin} />
		</Route>
	</Router>
);

Meteor.startup(() => {
	ReactDOM.render(routes, document.querySelector('.render-target'));
});
