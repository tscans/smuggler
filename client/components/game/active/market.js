import React from 'react';

var contrabandList = {
	spice: {
		name: "Spices",
		min: 110,
		max: 240
	},
	ds: {
		name: "Death Sticks",
		min: 98,
		max: 210
	},
	ib: {
		name: "Imperial Blasters",
		min: 162,
		max: 410
	},
	ws: {
		name: "Wookie Slaves",
		min: 2700,
		max: 3800
	},
	tg: {
		name: "Tibanna Gas",
		min: 900,
		max: 1200
	},
	tb: {
		name: "Tach Brains",
		min: 213,
		max: 450
	},
	cw: {
		name: "Clean Water",
		min: 15,
		max: 111
	},
	cr: {
		name: "Chak-Root",
		min: 180,
		max: 417
	},
	bacta: {
		name: "Bacta",
		min: 1111,
		max: 1567
	},
	kc: {
		name: "Kyber Crystals",
		min: 85000,
		max: 120000
	},
	bd: {
		name: "Battle Droids",
		min: 450,
		max: 900
	},
	ma: {
		name: "Mandalorian Armor",
		min: 8000,
		max: 12000
	},
	pc: {
		name: "Rare Pazaak Cards",
		min: 19000,
		max: 26000
	}
}

class Market extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			contraband: null,
			c: null
		}
	}
	findCargo(){
		var contraband = this.props.game.contraband;
		var total = 0;
		for(c in contraband){
			total = total + contraband[c].qty;
		}
		return total.toString();
	}
	purchaseContraband(){
		var x = parseInt(this.refs.quantity.value.trim());
		if(x == 0){
			Bert.alert( 'Cant buy nothin', 'danger', 'fixed-top', 'fa-frown-o' );
			return;
		}
		if(this.props.game.cargoSpace < (parseInt(this.findCargo())+x)){
			Bert.alert( "You dont have enough cargo space.", 'danger', 'fixed-top', 'fa-frown-o' );
			return;
		}
		if(this.props.game.credits < (x)*this.state.contraband.price){
			Bert.alert( 'You dont have the credits for that', 'danger', 'fixed-top', 'fa-frown-o' );
			return;
		}
		var data = {
			gameID: this.props.game._id,
			buy: parseInt(this.refs.quantity.value.trim()),
			c: this.state.c
		}
		Meteor.call('game.buyContraband', data, (error,data)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log(data);
				var yo = parseInt(this.refs.quantity.value.trim());
				this.refs.quantity.value = 0;
				var k = this.state.contraband;
				k.qty = k.qty + yo;
				this.setState({contraband: k});
			}
		})
	}
	sellContraband(){
		var x = parseInt(this.refs.quantity2.value.trim());
		if(x == 0){
			Bert.alert( 'You cant sell me nothing.', 'danger', 'fixed-top', 'fa-frown-o' );
			return;
		}
		if(x > this.state.contraband.qty){
			Bert.alert( 'You can only sell what you have!', 'danger', 'fixed-top', 'fa-frown-o' );
			return;
		}
		var data = {
			gameID: this.props.game._id,
			sell: parseInt(this.refs.quantity2.value.trim()),
			c: this.state.c
		}
		Meteor.call('game.sellContraband', data, (error,data)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log(data);
				var yo = parseInt(this.refs.quantity2.value.trim());
				this.refs.quantity2.value = 0;
				var k = this.state.contraband;
				k.qty = k.qty - yo;
				this.setState({contraband: k});
			}
		})
	}
	quant(a){
		if(a){
			var x = parseInt(this.refs.quantity.value.trim());
			if(this.props.game.credits < (x+1)*this.state.contraband.price){
				return;
			}
			if(this.props.game.cargoSpace < (parseInt(this.findCargo())+(x+1))){
				return
			}
			this.refs.quantity.value = x+1;
		}
		else{
			var x = parseInt(this.refs.quantity.value.trim());
			if(x == 0){
				return;
			}
			this.refs.quantity.value = x-1;
		}
		
	}
	quant2(a){
		if(a){
			var x = parseInt(this.refs.quantity2.value.trim());
			if(x+1 > this.state.contraband.qty){
				return;
			}
			this.refs.quantity2.value = x+1;
		}
		else{
			var x = parseInt(this.refs.quantity2.value.trim());
			if(x == 0){
				return;
			}
			this.refs.quantity2.value = x-1;
		}
		
	}
	buyModal(){
		var black = {color: "black"}
		var lrg = {fontSize: "24px",margin: "5px", width: "15%",marginBottom: "3vh"}
		
		if(!this.state.contraband){
			return(
				<div>
					<div id="myModalexample" className="modal">
					  <header className="bar bar-nav">
					    <a className="btn pull-right" href="#myModalexample">Close</a>
					    <h1 className="title">...Loading</h1>
					  </header>
					  <div className="content">
					    <p className="content-padded">...Loading</p>
					  </div>
					</div>
				</div>
			)
		}
		var most = Math.floor(this.props.game.credits/this.state.contraband.price);
		var b = this.props.game.cargoSpace - this.findCargo();
		if(b < most){
			most = b;
		}
		return(
			<div>
				<div id="myModalexample" className="modal">
				  <header className="bar bar-nav">
				    <a className="btn pull-right" href="#myModalexample">Close</a>
				    <h1 className="title">{this.state.contraband.name}</h1>
				  </header>
				  <div className="content" style={black}>
				    <div className="content-padded">
				    	<h3>Purchase {this.state.contraband.name}</h3>
				    	<p>Credits: {this.props.game.credits}</p>
				    	<p>Contraband Price: <span className="my-galactic">$</span> {this.state.contraband.price}</p>
				    	<p>Current Amount Owned: {this.state.contraband.qty}</p>
				    	<p>Cargo Space: {this.findCargo()}/{this.props.game.cargoSpace}</p>
				    	<p>Most you can buy: {most}</p>
				    	<input type="text" ref="quantity" defaultValue="0" />
				    	<button style={lrg} className="btn btn-positive" onClick={()=>{this.quant(true)}}>
						  +
						</button>
						<button style={lrg} className="btn btn-negative" onClick={()=>{this.quant(false)}}>
						  -
						</button>
						<button className="btn btn-primary btn-block" onClick={this.purchaseContraband.bind(this)}>Buy Contraband</button>
						<input type="text" ref="quantity2" defaultValue="0" />
				    	<button style={lrg} className="btn btn-positive" onClick={()=>{this.quant2(true)}}>
						  +
						</button>
						<button style={lrg} className="btn btn-negative" onClick={()=>{this.quant2(false)}}>
						  -
						</button>
						<button className="btn btn-negative btn-block" onClick={this.sellContraband.bind(this)}>Sell Contraband</button>
				    </div>
				  </div>
				</div>
			</div>
		)
	}
	openModal(cc,c){
		this.setState({contraband: cc,c:c});
		$("#myModalexample").addClass("active")
		//$("#info").removeClass("active") 
	}
	renderRows(){
		var contraband = this.props.game.contraband;
		var i = 0;
		return Object.keys(contraband).map(c=>{
			i = i + 1;
			console.log(c)
			var value = 0;
			//0 - 100 hsl
			var max = contrabandList[c].max;
			var min = contrabandList[c].min;
			//0-1 normalization
			//x-min/max-min
			value = (contraband[c].price - min)/(max - min);
			if(value > 1){value = 1;}
			if(value < 0){value = 0;}
			value = 1 - value;
			value = parseInt(value*130);
			var colorWheel = {
				color: "hsl("+value+", 50%, 50%)"
			}
			return(
				<tr style={colorWheel} key={contraband[c].name} onClick={()=>{this.openModal(contraband[c],c)}}>
				    <td>{contraband[c].name}</td>
				    <td>{contraband[c].price}</td>
				    <td>{contraband[c].qty}</td>
				</tr>
			)
		})
	}
	render(){
		return(
			<div>
				{this.buyModal()}
				<table>
				  <tr>
				    <th>Contraband</th>
				    <th><span className="my-galactic">$</span> Price</th>
				    <th>Quantity</th>
				  </tr>
				  {this.renderRows()}
				</table>
			</div>
		)
	}
}

export default Market;