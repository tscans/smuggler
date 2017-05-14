import React from 'react';
import {browserHistory} from 'react-router';
import NewTurn from './new_turn';

var planets = ["Coruscant", "Tatooine", "Bespin", "Corellia", "Kessel", "Naboo"];

var callbackList = ["firstwookie", "bounty", "bountydead", "shipdamage", "mugged", 
"imperialcheckpoint", "wookieluck", "mysterious", "asteroidfield", "wookiebetrayal",
"cheap", "crackdown"];

class Header extends React.Component{
	goBack(){
		browserHistory.push("/game/");
	}
	renderPlanets(){
		var planets = ["Coruscant", "Tatooine", "Bespin", "Corellia", "Kessel", "Naboo"];

		var index = planets.indexOf(this.props.game.currentLocation);
		if(!(index < 0)){
			planets.splice(index, 1);
		}
		
		return planets.map(p=>{
			return(
				<div key={p} onClick={()=>{this.nextTurn(p)}}>
					<li className="table-view-cell" href="#planets">{p}</li>
				</div>
			)
		})
	}
	nextTurn(p){
		var data = {
			gameID: this.props.gameID,
			newLocation: p
		}
		Meteor.call('game.nextPeriod', data, (error,dat)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log(dat);
				var popovers = $('#planets');
			     $(popovers).removeClass('visible');
			     $(popovers).removeClass('active');
			     $(popovers).hide();
			     $("div.backdrop").remove();
			//      priceOutlier: true,
			// newWookie: newWookie,
			// wookieFlipout: wookieFlipout,
			// wookieLuck: wookieLuck,
			// newBounty: newBounty,
			// shipDamage: shipDamage
				if(dat.gameover == "bountydead" || dat.gameover == "shipdead"){
			     	$("#gameover").addClass('active');
			     	return;
			     }
			     if(dat.gameover == "endperiod"){
			     	console.log('runthis')
			     	$("#endgame").addClass('active');
			     	return;
			     }
			     if(dat.priceOutlier){
			     	$("#priceChange").addClass('active');
			     }
			     if(dat.newWookie){
			     	$("#newWookie").addClass('active');
			     }
			     if(dat.wookieFlipout){
			     	$("#wookieFlipout").addClass('active');
			     }
			     if(dat.wookieLuck){
			     	$("#wookieLuck").addClass('active');
			     }
			     if(dat.newBounty){
			     	$("#newBounty").addClass('active');
			     }
			     if(dat.shipDamage){
			     	$("#shipDamage").addClass('active');
			     }
			}
		})
	}
	render(){
		var color = {
			color: "black"
		}
		return(
			<div>
				<header className="bar bar-nav">
				  <button className="btn pull-left" onClick={this.goBack.bind(this)}>
				    Game Menu
				  </button>
				  <a href="#planets">
				    <h1 className="title">
				      {this.props.game.currentLocation}
				      <span className="icon icon-caret"></span>
				    </h1>
				  </a>
				  <button className="btn pull-right">
				    Week - {this.props.game.currentPeriod}/{this.props.game.periods}
				  </button>
				</header>
				<NewTurn game={this.props.game}/>
				<div id="planets" className="popover">
				  <header className="bar bar-nav">
				    <h1 className="title">Travel Next Week</h1>
				  </header>
				  <ul className="table-view" style={color}>
				    {this.renderPlanets()}
				  </ul>
				</div>
			</div>
		)
	}
}

export default Header;