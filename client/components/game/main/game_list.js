import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Game} from '../../../../imports/collections/game';
import {browserHistory} from 'react-router';

class GameList extends React.Component{
	deleteGame(gid){
		Meteor.call("game.removeGame", gid, (error,data)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log(data);
			}
		})
	}
	toGame(gid){
		browserHistory.push("/game/"+gid+"/");
	}
	renderList(){
		var b8 = {
			width: "79%",
			float: "left"
		}
		var b2 = {
			width: "20%",
			float: "right"
		}
		return this.props.games.map(g=>{
			return(
				<div key={g._id}>
					<button onClick={()=>{this.toGame(g._id)}} className="btn btn-primary btn-block" style={b8}>
					Captain {g.gameName}<br/>
					Week {g.currentPeriod}/{g.periods}<br/>
					<span className="my-galactic">$</span> {g.credits}<br/>
					Last Play: {g.playedLast}
					</button>
					<button onClick={()=>{this.deleteGame(g._id)}} className="btn btn-negative btn-block" style={b2}><i className="fa fa-times"></i></button>
				</div>
			)
		})
	}
	render(){
		if(!this.props.games){
			return(
				<div>
					....Loading
				</div>
			)
		}
		return(
			<div>
				{this.renderList()}
			</div>
		)
	}
}

export default createContainer((props)=>{
    Meteor.subscribe("allGames");

    return {games: Game.find({}).fetch()}

    
}, GameList);