import React from 'react';

class SubHeader extends React.Component{
	calculateWorth(){
		//credits + ship + hideout - loan
		var credits = this.props.game.credits;
		var loan = this.props.game.loan;
		var ships = ["Kessel Vessel", "Bespin Shuttle", "Corellian Starship", "Nubian Yacht"];
		var shipPrice = [0,200000,1000000,10000000];

		var hideouts = ["No Hideout","Kessel Mine", "Tatooine Flats", "Bespin Condo", "Naboo Palace", "Coruscant Penthouse"];
		var hideoutPrice = [0,50000,150000,500000,5000000,50000000];
		var ship = shipPrice[ships.indexOf(this.props.game.ship)];
		var hideout = hideoutPrice[hideouts.indexOf(this.props.game.hideout)];
		var netWorth = credits + ship + hideout - loan;
		var box = [netWorth,ship,hideout];
		return box;
	}
	payLoan(){
		if(this.props.game.credits < parseInt(this.refs.pay.value.trim())){
			Bert.alert( "Not enough credits.", 'danger', 'fixed-top', 'fa-frown-o' );
			return;
		}
		if(this.refs.pay.value.trim() == ""){
			Bert.alert( 'Enter an amount!', 'danger', 'fixed-top', 'fa-frown-o' );
			return;
		}
		var payment = parseInt(this.refs.pay.value.trim());
		if(payment > this.props.game.loan){
			payment = this.props.game.loan;
		}
		var data = {
			payDown: payment,
			gameID: this.props.game._id
		}
		Meteor.call("game.payLoan", data,(error,data)=>{
			if(error){
				console.log(error);
				Bert.alert( error.reason, 'danger', 'fixed-top', 'fa-frown-o' );
			}
			else{
				console.log(data);
				Bert.alert( "Paid amount", 'success', 'fixed-top' );
				this.refs.pay.value = "";
			}
		})
	}
	getLoan(){
		if(this.props.game.loan + parseInt(this.refs.pay.value.trim()) > (this.props.game.currentPeriod*5000)){
			Bert.alert( "Woah! You can only owe "+(this.props.game.currentPeriod*5000)+" credits.", 'danger', 'fixed-top', 'fa-frown-o' );
			return;
		}
		if(this.refs.pay.value.trim() == ""){
			Bert.alert( 'Enter an amount!', 'danger', 'fixed-top', 'fa-frown-o' );
			return;
		}
		var data = {
			newLoan: parseInt(this.refs.pay.value.trim()),
			gameID: this.props.game._id
		}
		Meteor.call('game.getLoan', data, (error,data)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log(data);
				this.refs.pay.value = "";
			}
		})
	}
	loadModal(){
		var sides = {
			width: "70%",
			marginLeft: "15vw",
			marginTop: "-8vh"
		}
		var black = {color: "black"}
		return(
			<div>
				<div id="loan" className="modal">
				  <header className="bar bar-nav">
				    <a className="btn pull-right" href="#loan">Close</a>
				    <h1 className="title">Loaned Credits</h1>
				  </header>
				  <div className="content">
				  	<img src="http://vignette4.wikia.nocookie.net/starwars/images/2/2e/Jabba_the_Hutt_SoC.jpg/revision/latest?cb=20081217162723" width="100%"/>
				  	<div style={sides}>
					    <h3>Pay back the loan you owe the Hutts</h3>
					    <p>Amount Owed: {this.props.game.loan}</p>
					    <p>Credits: {this.props.game.credits}</p>
					    <p>Weeks With Loan: {this.props.game.loanPeriods}</p>
					    <input style={black} ref="pay" type="text" placeholder="Amount"/>
					    <button className="btn btn-negative" onClick={this.payLoan.bind(this)}>
						  Pay Back
						</button>
						<button className="btn btn-positive" onClick={this.getLoan.bind(this)}>
						  Borrow
						</button>					    
					</div>
				  </div>
				</div>
			</div>
		)
	}
	loadCredits(){
		var sides = {
			width: "70%",
			marginLeft: "15vw"
		}
		var black = {color: "black"};
		var green = {color: "green"};
		var red = {color: 'red'};
		var nums = this.calculateWorth();
		console.log(nums)
		return(
			<div>
				<div id="credits" className="modal">
				  <header className="bar bar-nav">
				    <a className="btn pull-right" href="#credits">Close</a>
				    <h1 className="title">Credits and Equity</h1>
				  </header>
				  <div className="content">
				  	<img src="https://www.3dprintwise.com/wp-content/uploads/2014/08/3d-printed-accessory.jpg" width="100%"/>
				  	<div style={sides}>
					    <h3 style={black}>Total Net Worth: {nums[0]}</h3>
					    <p style={red}>Amount Owed: {this.props.game.loan}</p>
					    <p style={green}>Credits: {this.props.game.credits}</p>
					    <p style={green}>Ship Value: {nums[1]}</p>
					    <p style={green}>Hideout Value: {nums[2]}</p>				    
					</div>
				  </div>
				</div>
			</div>
		)
	}
	openLoan(){
		$("#loan").addClass("active")
	}
	openCredits(){
		$("#credits").addClass("active")
	}
	render(){
		return(
			<div>
				{this.loadModal()}
				{this.loadCredits()}
				<div className="bar bar-standard bar-header-secondary">
				  <button className="btn btn-positive pull-left" onClick={()=>{this.openCredits()}}>
				  	<span className="my-galactic">$</span> {this.props.game.credits}
				  </button>
				  <button className="btn btn-negative pull-right" onClick={()=>{this.openLoan()}}>
				  	<span className="my-galactic">$</span> -{this.props.game.loan}
				  </button>
				</div>
			</div>
		)
	}
}

export default SubHeader;