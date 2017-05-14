import React from 'react';

function makeCheap(name){
	var r = Math.floor(Math.random()*2);
	if(r == 0){
		return "Smugglers have broken into an imperial repository. "+name+" are cheap!";
	}
	else if(r == 1){
		return "Hyperspace routes are clearer without any recent imperial blockades. "+name+" are cheap!";
	}
}

function makePricey(name){
	var r = Math.floor(Math.random()*2);
	if(r == 0){
		return "Imperials are cracking down on illegal smuggling. "+name+" are expensive!";
	}
	else if(r == 1){
		return "The empire is looking for a reason to jail smugglers with specific contriband. It's much harder to sell "+name+" and thus its prices are up!";
	}
}

// priceOutlier: true,--
// newWookie: newWookie,--
// wookieFlipout: wookieFlipout,--
// wookieLuck: wookieLuck,--
// newBounty: newBounty,--
// shipDamage: shipDamage--
//game over too
var black = {color: "black"}
class NewTurn extends React.Component{
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
	renderPriceChange(){
		var black = {color: "black"}
		if(this.props.game.priceOutlier.cheap){
			return(
				<div id="priceChange" className="modal">
				  <header className="bar bar-nav">
				    <a className="btn pull-right" href="#priceChange">Close</a>
				    <h1 className="title">{this.props.game.priceOutlier.name}</h1>
				  </header>
				  <div className="content" style={black}>
				    <div className="content-padded">
				    	{makeCheap(this.props.game.priceOutlier.name)}
				    </div>
				  </div>
				</div>
			)
		}
		return(
			<div id="priceChange" className="modal">
			  <header className="bar bar-nav">
			    <a className="btn pull-right" href="#priceChange">Close</a>
			    <h1 className="title">{this.props.game.priceOutlier.name}</h1>
			  </header>
			  <div className="content" style={black}>
			    <div className="content-padded">
			    	{makePricey(this.props.game.priceOutlier.name)}
			    </div>
			  </div>
			</div>
		)
	}
	renderNewWookie(){
		return(
			<div id="newWookie" className="modal">
			  <header className="bar bar-nav">
			    <a className="btn pull-right" href="#newWookie">Close</a>
			    <h1 className="title">Wookie Life Debt</h1>
			  </header>
			  <div className="content" style={black}>
			    <div className="content-padded">
			    	<img src="/wookiefight.png" width="100%"/>
			    	After being a wookie's hero in a cantina brawl, a wookie owes you a life debt. Grrarrn is your new wookie companion. Wookie companions cut debt interest rates in half and can find you additional credits on occassion.
			    </div>
			  </div>
			</div>
		)
	}
	renderWookieFlipout(){
		return(
			<div id="wookieFlipout" className="modal">
			  <header className="bar bar-nav">
			    <a className="btn pull-right" href="#wookieFlipout">Close</a>
			    <h1 className="title">Wookie Flip Out</h1>
			  </header>
			  <div className="content" style={black}>
			    <div className="content-padded">
			    	<img src="/angrywookie.png" width="100%"/>
			    	Grrarrn is very angry about your wookie slave trade and is rescinding his life debt. He leaves with damaging your ship and stealing your credits.
			    </div>
			  </div>
			</div>
		)
	}
	renderWookieLuck(){
		return(
			<div id="wookieLuck" className="modal">
			  <header className="bar bar-nav">
			    <a className="btn pull-right" href="#wookieLuck">Close</a>
			    <h1 className="title">Wookie Help</h1>
			  </header>
			  <div className="content" style={black}>
			    <div className="content-padded">
			    	Grrarrn has found you some credits.
			    </div>
			  </div>
			</div>
		)
	}
	renderNewBounty(){
		return(
			<div id="newBounty" className="modal">
			  <header className="bar bar-nav">
			    <a className="btn pull-right" href="#newBounty">Close</a>
			    <h1 className="title">Bounty</h1>
			  </header>
			  <div className="content" style={black}>
			    <div className="content-padded">
			    	There's a bounty on your head! You find a note urging you to pay your debts to the Hutts. <br/><br/>
			    	"Pay your debts or I'll be back." -BF
			    </div>
			  </div>
			</div>
		)
	}
	renderShipDamage(){
		if(this.props.game.currentPeriod%2 ==0){
			return(
				<div id="shipDamage" className="modal">
				  <header className="bar bar-nav">
				    <a className="btn pull-right" href="#shipDamage">Close</a>
				    <h1 className="title">Ship Damage!</h1>
				  </header>
				  <div className="content" style={black}>
				    <div className="content-padded">
				    	<img src="/stardestroyer.png" width="100%"/>
				    	You come out of hyperspace to find an imperial blockade!
				    	You manage to evade them and get to your destination but not without taking damage to your ship.
				    </div>
				  </div>
				</div>
			)
		}
		return(
			<div id="shipDamage" className="modal">
			  <header className="bar bar-nav">
			    <a className="btn pull-right" href="#shipDamage">Close</a>
			    <h1 className="title">Ship Damage!</h1>
			  </header>
			  <div className="content" style={black}>
			    <div className="content-padded">
			    	<img src="/asteroids.png" width="100%"/>
			    	The odds of successfully navigating an asteroid field are 3,720 to 1.
			    	Somehow you managed to get to safety but not without damage to your ship.
			    </div>
			  </div>
			</div>
		)
		
	}
	renderGameOver(){
		if(this.props.game.gameover == "bountydead"){
			return(
				<div id="gameover" className="modal">
				  <header className="bar bar-nav">
				    <a className="btn pull-right" href="#gameover">Close</a>
				    <h1 className="title">You are dead!</h1>
				  </header>
				  <div className="content" style={black}>
				    <div className="content-padded">
				    	<img src="/boba.png" width="100%"/>
				    	"I told you I'd be back!" -BF
				    	You failed to pay your debts to the Hutts and have paid the price for it!
				    	Game over.

				    </div>
				  </div>
				</div>
			)
		}
		return(
			<div id="gameover" className="modal">
			  <header className="bar bar-nav">
			    <a className="btn pull-right" href="#gameover">Close</a>
			    <h1 className="title">You are dead!</h1>
			  </header>
			  <div className="content" style={black}>
			    <div className="content-padded">
			    	<img src="/stardestroyer.png" width="100%"/>
			    	Your ship has been destroyed by the empire!
			    	The emperor is pleased with one less smuggler moving contraband.
			    	Game over.
			    </div>
			  </div>
			</div>
		)
	}
	renderEndGame(){
		var w = this.calculateWorth()[0];
		console.log(w)
		if(w > 50000000){
			return(
				<div id="endgame" className="modal">
				  <header className="bar bar-nav">
				    <a className="btn pull-right" href="#endgame">Close</a>
				    <h1 className="title">The Captain</h1>
				  </header>
				  <div className="content" style={black}>
				    <div className="content-padded">
				    	<h1><span className="my-galactic">GAME OVER</span></h1>
				    	You are one of the greatest smugglers to have ever lived. Your name will
				    	go down with the the best. You own the black markets.
				    	And for your efforts you will retire with extreme relaxation while your amazing repuation gives you a power some will never understand.
				    	You finish with an incredible net worth of {w}.
				    	<br/>
				    	<br/>
				    	<br/>
				    	<br/>
				    	<br/>
				    	(Who are we kidding you crystal horder.)
				    </div>
				  </div>
				</div>
			)
		}
		else if(w <= 0){
			return(
				<div id="endgame" className="modal">
				  <header className="bar bar-nav">
				    <a className="btn pull-right" href="#endgame">Close</a>
				    <h1 className="title">Quit your day job</h1>
				  </header>
				  <div className="content" style={black}>
				    <div className="content-padded">
				    	<h1><span className="my-galactic">GAME OVER</span></h1>
				    	You are a pretty bad smuggler. In {this.props.game.periods} weeks, you 
				    	aren't worth a credit. Try mining on Kessel. You might be better off.
				    </div>
				  </div>
				</div>
			)
		}
		else if(w < 1000000){
			return(
				<div id="endgame" className="modal">
				  <header className="bar bar-nav">
				    <a className="btn pull-right" href="#endgame">Close</a>
				    <h1 className="title">Decent Life</h1>
				  </header>
				  <div className="content" style={black}>
				    <div className="content-padded">
				    	<h1><span className="my-galactic">GAME OVER</span></h1>
				    	Not bad, for a rookie. Just kidding. You got the stuff of a smuggler
				    	Captain {this.props.game.gameName}. You will someday lead a good retirenment
				    	on your {w} net worth.
				    </div>
				  </div>
				</div>
			)
		}
		else if(w <= 50000000){
			return(
				<div id="endgame" className="modal">
				  <header className="bar bar-nav">
				    <a className="btn pull-right" href="#endgame">Close</a>
				    <h1 className="title">Contraband Connoisseur</h1>
				  </header>
				  <div className="content" style={black}>
				    <div className="content-padded">
				    	<h1><span className="my-galactic">GAME OVER</span></h1>
				    	You are one of the better pilots to have flown the stars. Your excellence in 
				    	smuggling has made you exceedingly wealthy. You can retire in comfort.
				    </div>
				  </div>
				</div>
			)
		}
		

	}
	render(){
		return(
			<div>
				{this.renderPriceChange()}
				{this.renderNewWookie()}
				{this.renderWookieFlipout()}
				{this.renderWookieLuck()}
				{this.renderNewBounty()}
				{this.renderShipDamage()}
				{this.renderGameOver()}
				{this.renderEndGame()}
			</div>
		)
	}
}

export default NewTurn;