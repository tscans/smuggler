import React from 'react';

var ships = ["Kessel Vessel", "Bespin Shuttle", "Corellian Starship", "Nubian Yacht"];
var shipHealth = [100,110,130,150];
var shipSpace = [100,110,150,200];
var shipDefense = [0.25,0.16,0.08,0.001];
var shipPrice = [0,200000,1000000,10000000];
var shipPictures = ["/kessel.png","/bespin.png","/corellian.png","/nubian.png"];

class Ship extends React.Component{
	buyShip(x){
		var cc = this.props.game.credits;
		if(cc < shipPrice[x]){
			Bert.alert( "You dont have enough credits for that ship!", 'danger', 'fixed-top', 'fa-frown-o' );
			return;
		}
		if(x <= ships.indexOf(this.props.game.ship)){
			Bert.alert( "You have a ship of equal or greater worth already.", 'danger', 'fixed-top', 'fa-frown-o' );
			return;
		}
		var data = {
			gameID: this.props.game._id,
			sv: x
		}
		Meteor.call("game.buyShip", data, (error,data)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log(data);
			}
		})
	}
	renderBuyables(){
		var z = [];
		var v = ships.indexOf(this.props.game.ship);
		for(var i = 0; i < ships.length; i++){
			if(i > v){
				z.push({
					name: ships[i],
					number: [i],
					price: shipPrice[i]
				})
			}
		}
		var buff = {marginTop: "5px"}
		return z.map(y=>{
			return(
				<div key={y.number} style={buff}>
					<button className="btn btn-primary" onClick={()=>{this.buyShip(y.number)}}>
					Buy {y.name} <span className="badge badge-primary"><span className="my-galactic">$</span> {y.price}</span>
					</button>
				</div>
			)
		})
	}
	shipModal(){
		return(
			<div>
				<div id="ship" className="modal">
				  <header className="bar bar-nav">
				    <a className="btn pull-right" href="#ship">Close</a>
				    <h1 className="title">Ship</h1>
				  </header>

				  <div className="content">
				  	<img src={this.props.game.shipPicture} width="100%"/>
				    <div className="content-padded">
				    	<h3>Ship: {this.props.game.ship}</h3>
				    	<p>Ship Value: {shipPrice[ships.indexOf(this.props.game.ship)]}</p>
				    	<h4>Buy New Ship</h4>
				    	{this.renderBuyables()}
				    </div>
				  </div>
				</div>
			</div>
		)
	}
	openModal(){
		$("#ship").addClass("active");
	}
	render(){
		var lgc = {height: "18vh", 
		background: '#cccccc url("'+this.props.game.shipPicture+'") center', 
		backgroundSize: "100%",
		fontSize: "18px",
		color: "white"
		}

		return(
			<div>
				{this.shipModal()}
				<li onClick={this.openModal.bind(this)} className="table-view-cell" style={lgc}>Ship</li>
			</div>
		)
	}
}

export default Ship;