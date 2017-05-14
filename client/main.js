import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Landing from './components/landing/landing';
import MainLanding from './components/landing/main/main_landing';

import Game from './components/game/game';
import MainGame from './components/game/main/main_game';

import MainActive from './components/game/active/main_active';

import Leaderboard from './components/leaderboards/leaderboard';
import LeaderboardMain from './components/leaderboards/leaderboard_main';

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={Landing}>
			<IndexRoute component={MainLanding} />
		</Route>
		<Route path="/game/" component={Game}>
			<IndexRoute component={MainGame} />
			<Route path=":gameID/" component={MainActive} />
		</Route>
		<Route path="/leaderboard/" component={Leaderboard}>
			<IndexRoute component={LeaderboardMain} />
		</Route>
	</Router>
);


Meteor.startup(() => {
	ReactDOM.render(routes, document.querySelector('.render-target'));
});
