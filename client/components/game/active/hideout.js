import React from 'react';

var hideouts = ["No Hideout","Kessel Mine", "Tatooine Flats", "Bespin Condo", "Naboo Palace", "Coruscant Penthouse"];
var hideoutPrice = [0,50000,150000,500000,5000000,50000000];

class Hideout extends React.Component{
	buyHideout(x){
		var cc = this.props.game.credits;
		if(cc < hideoutPrice[x]){
			Bert.alert( "You dont have enough credits for that hideout!", 'danger', 'fixed-top', 'fa-frown-o' );
			return;
		}
		if(x <= hideouts.indexOf(this.props.game.hideout)){
			Bert.alert( "You have a hideout of equal or greater worth already.", 'danger', 'fixed-top', 'fa-frown-o' );
			return;
		}
		var data = {
			gameID: this.props.game._id,
			sv: x
		}
		Meteor.call("game.buyHideout", data, (error,data)=>{
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
		var v = hideouts.indexOf(this.props.game.hideout);
		for(var i = 0; i < hideouts.length; i++){
			if(i > v){
				z.push({
					name: hideouts[i],
					number: [i],
					price: hideoutPrice[i]
				})
			}
		}
		var buff = {marginTop: "5px"}
		return z.map(y=>{
			return(
				<div key={y.number} style={buff}>
					<button className="btn btn-primary" onClick={()=>{this.buyHideout(y.number)}}>
					Buy {y.name} <span className="badge badge-primary"><span className="my-galactic">$</span> {y.price}</span>
					</button>
				</div>
			)
		})
	}
	hideoutModal(){
		return(
			<div>
				<div id="hideout" className="modal">
				  <header className="bar bar-nav">
				    <a className="btn pull-right" href="#hideout">Close</a>
				    <h1 className="title">Hideout</h1>
				  </header>

				  <div className="content">
				  	<img src={this.props.game.hideoutPicture} width="100%"/>
				    <div className="content-padded">
				    	<h3>Hideout: {this.props.game.hideout}</h3>
				    	<h4>Hideout Value: {hideoutPrice[hideouts.indexOf(this.props.game.hideout)]}</h4>
				    	{this.renderBuyables()}
				    </div>
				  </div>
				</div>
			</div>
		)
	}
	openModal(){
		$("#hideout").addClass("active");
	}
	render(){
		var lgc = {height: "18vh", 
		background: '#cccccc url("'+this.props.game.hideoutPicture+'") center', 
		backgroundSize: "100%",
		fontSize: "18px",
		color: "white"
		}
		return(
			<div>
				{this.hideoutModal()}
				<li onClick={this.openModal.bind(this)} className="table-view-cell" style={lgc}>Hideout</li>
			</div>
		)
	}
}

export default Hideout;