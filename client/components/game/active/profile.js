import React from 'react';
import Ship from './ship';
import Hideout from './hideout';

class Profile extends React.Component{
	repairShip(){
		if(this.props.game.credits < 15000){
			Bert.alert( "You dont have enough credits.", 'danger', 'fixed-top', 'fa-frown-o' );
			return;
		}
		if(this.props.game.currentHealth == 100){
			Bert.alert( "You are maxed out!", 'danger', 'fixed-top', 'fa-frown-o' );
			return;
		}
		var data = {
			gameID: this.props.game._id
		}
		Meteor.call('game.buyHealth',data, (error,data)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log(data);
			}
		})
	}
	openModal(){
		$("#health").addClass("active");
	}
	healthModal(){
		var black = {color: "black"}
		return(
			<div>
				<div id="health" className="modal">
				  <header className="bar bar-nav">
				    <a className="btn pull-right" href="#health">Close</a>
				    <h1 className="title">Repair Ship</h1>
				  </header>

				  <div className="content">
				  	<img src="/repairship.png" width="100%"/>
				    <div className="content-padded">
				    	<h3 style={black}>Ship Health: {this.props.game.currentHealth}/{this.props.game.shipHealth}</h3>
				    	<p>Repair you ship by 15 health points at a time.</p>
				    	<p>Health points are <span className="my-galactic">$</span>1000 each</p>
				    	<button className="btn btn-positive btn-block" onClick={this.repairShip.bind(this)}>
				    		<i className="fa fa-medkit" aria-hidden="true"></i> Repair
				    	</button>
				    </div>
				  </div>
				</div>
			</div>
		)
	}
	findCargo(){
		var contraband = this.props.game.contraband;
		var total = 0;
		for(c in contraband){
			total = total + contraband[c].qty;
		}
		return total.toString();
	}
	bounty(){
		if(this.props.game.bounty){
			var red = {backgroundColor: "red"};
			return(
				<li className="table-view-cell" style={red}>There is a bounty on your head. Pay your loans or suffer.</li>
			)
		}
		else{
			return(
				<div>

				</div>
			)
		}
	}
	wookie(){
		if(this.props.game.wookie){
			return(
				<li className="table-view-cell">Wookie Life Debt - {this.props.game.wookie}</li>
			)
		}
		else{
			return(
				<div>

				</div>
			)
		}
	}
	render(){
		
		var middle = {textAlign: "center"};
		var black = {color: "black"};
		return(
			<div>
				{this.healthModal()}
				<h4 style={middle}>Itinerary of Captain {this.props.game.gameName}</h4>
				<ul className="table-view" style={black}>
				  {this.bounty()}
				  {this.wookie()}
				  <li className="table-view-cell">Cargo Space - {this.findCargo()}/{this.props.game.cargoSpace}</li>
				  <li className="table-view-cell" onClick={this.openModal.bind(this)}>Ship Health - {this.props.game.currentHealth}/{this.props.game.shipHealth}</li>
				</ul>
				<ul className="table-view" style={black}>
				  <Ship game={this.props.game}/>
				  <Hideout game={this.props.game} />
				</ul>
			</div>
		)
	}
}

export default Profile;