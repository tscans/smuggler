import React from 'react';
import {Leaderboard} from '../../../imports/collections/leaderboard';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

class LeaderboardMain extends React.Component{
	leaders(){
		return this.props.leaders.map(l=>{
			return(
				<div key={l._id}>
					<button className="btn btn-block">
						Captain {l.game.gameName} - <span className="my-galactic">$</span> {l.netWorth} - Weeks: {l.game.periods}
					</button>
				</div>
			)
		})
	}
	render(){
		console.log(this.props.leaders)
		if(!this.props.leaders){
			return<div>...Loading</div>
		}
		var buff = {marginTop: "10vh"}
		return(
			<div>
				<header className="bar bar-nav">
				  <h1 className="title">Leaderboards</h1>
				  <button className="btn pull-left" onClick={()=>{browserHistory.push("/game/")}}>
				    Game Menu
				  </button>
				</header>
				<div style={buff}>
					{this.leaders()}
				</div>
			</div>
		)
	}
}

export default createContainer((props)=>{
    Meteor.subscribe("leaderboards");

    return {leaders: Leaderboard.find({}).fetch()}

    
}, LeaderboardMain);