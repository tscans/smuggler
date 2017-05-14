import {Game} from '../imports/collections/game';
import moment from 'moment';

var planets = ["Coruscant", "Tatooine", "Bespin", "Corellia", "Kessel", "Naboo"];
var contraband = ["Spices", "Death Sticks", "Imperial Blasters", "Wookie Slaves",
 "Tibanna Gas", "Tach Brains", "Clean Water", "Chak-Root", "Bacta",
 "Kyber Crystals", "Battle Droids"];
//$50 to the credit?
var lowMultiples = 0.1;
var highMultiples = 5.0;

function randomPrice(min,max,random){
	var random = Math.floor(random * (max - min + 1)) + min;
	return random;
}

var contrabandList = {
	spice: {
		name: "Spices",
		min: 57,
		max: 189
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
		min: 1201,
		max: 2360
	},
	tg: {
		name: "Tibanna Gas",
		min: 600,
		max: 900
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
		min: 142,
		max: 317
	},
	bacta: {
		name: "Bacta",
		min: 815,
		max: 1391
	},
	kc: {
		name: "Kyber Crystals",
		min: 19000,
		max: 26000
	},
	bd: {
		name: "Battle Droids",
		min: 181,
		max: 300
	},
	ma: {
		name: "Mandalorian Armor",
		min: 6000,
		max: 9000
	}
}

function genContraband(){
	var contraband = {
		spice: {
			name: "Spices",
			qty: 0,
			price: randomPrice(contrabandList.spice.min,contrabandList.spice.max,Math.random())
		},
		ds: {
			name: "Death Sticks",
			qty: 0,
			price: randomPrice(contrabandList.ds.min,contrabandList.ds.max,Math.random())
		},
		ib: {
			name: "Imperial Blasters",
			qty: 0,
			price: randomPrice(contrabandList.ib.min,contrabandList.ib.max,Math.random())
		},
		ws: {
			name: "Wookie Slaves",
			qty: 0,
			price: randomPrice(contrabandList.ws.min,contrabandList.ws.max,Math.random())
		},
		tg: {
			name: "Tibanna Gas",
			qty: 0,
			price: randomPrice(contrabandList.tg.min,contrabandList.tg.max,Math.random())
		},
		tb: {
			name: "Tach Brains",
			qty: 0,
			price: randomPrice(contrabandList.tb.min,contrabandList.tb.max,Math.random())
		},
		cw: {
			name: "Clean Water",
			qty: 0,
			price: randomPrice(contrabandList.cw.min,contrabandList.cw.max,Math.random())
		},
		cr: {
			name: "Chak-Root",
			qty: 0,
			price: randomPrice(contrabandList.cr.min,contrabandList.cr.max,Math.random())
		},
		bacta: {
			name: "Bacta",
			qty: 0,
			price: randomPrice(contrabandList.bacta.min,contrabandList.bacta.max,Math.random())
		},
		kc: {
			name: "Kyber Crystals",
			qty: 0,
			price: randomPrice(contrabandList.kc.min,contrabandList.kc.max,Math.random())
		},
		bd: {
			name: "Battle Droids",
			qty: 0,
			price: randomPrice(contrabandList.bd.min,contrabandList.bd.max,Math.random())
		},
		ma: {
			name: "Mandalorian Armor",
			qty: 0,
			price: randomPrice(contrabandList.ma.min,contrabandList.ma.max,Math.random())
		}
	}
	return contraband;
}


var ships = ["Kessel Vessel", "Bespin Shuttle", "Corellian Starship", "Nubian Yacht"];
var shipHealth = [100,110,130,150];
var shipSpace = [100,110,150,200];
var shipDefense = [0.20,0.12,0.03,0.001];
var shipPrice = [0,200000,1000000,10000000];
var shipPictures = ["/kessel.png","/bespin.png","/corellian.png","/nubian.png"];

var hideouts = ["No Hideout","Kessel Mine", "Tatooine Flats", "Bespin Condo", "Naboo Palace", "Coruscant Penthouse"];
var hideoutPrice = [0,50000,150000,500000,5000000,50000000];
var hideoutPictures = ["/nohideout.png", "/kesselmine.png", "/tatooineflats.png","/bespincondo.png", "/naboopalace.png", "/thepenthouse.png"];

// var defenses = ["Old Blaster", "Ion Rifle", "Blaster Rifle", "Scoundrel's Pistol"];

var callbackList = ["firstwookie", "bounty", "bountydead", "shipdamage", "mugged", 
"imperialcheckpoint", "wookieluck", "mysterious", "asteroidfield", "wookiebetrayal",
"cheap", "crackdown"];
//first wookie 5, wookieluck, wookiebetrayal ::::::: random
//bounty, bountydead----
//ship damage, mugged, asteroid field-----
//cheap, crackdown ****special property -priceOutlier- reads from random stories
//imperial checkpoint, mysterious ///// s p -eventOut- waits for decision, if none is given go default

Meteor.methods({
	'game.create':function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		var numGames = Game.find({metID: user}).fetch().length;
		if(numGames >= 3){
			console.log('too many games');
			return;
		}
		var d = new Date();
		var today = moment(d).format("ll");
		return Game.insert({
			metID: user,
			createdAt: today,
			playedLast: today,
			gameName: data.gameName,
			credits: 2000,
			loan: 5000,
			periods: data.periods,
			currentPeriod: 1,
			contraband: genContraband(),
			currentLocation: planets[4],
			ship: ships[0],
			shipHealth: shipHealth[0],
			currentHealth: shipHealth[0],
			hideout: hideouts[0],
			cargoSpace: shipSpace[0],
			wookie: false,
			bounty: null,
			loanPeriods: 0,
			shipPicture: shipPictures[0],
			hideoutPicture: hideoutPictures[0],
			gameover: false,
			priceOutlier: {
				cheap: null,
				name: null
			}

		});
	},
	'game.nextPeriod':function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		var game = Game.findOne({_id: data.gameID});
		if(!game){
			return;
		}
		if(game.metID != user){
			return;
		}
		//new turn
		if(game.gameover){
			if(game.gameover == "bountydead"){
				return {gameover: "bountydead"};
			}
			else if(game.gameover == "shipdead"){
				return {gameover: "shipdead"};
			}
			else{
				return {gameover: "endperiod"};
			}
			
		}
		if(game.currentPeriod >= game.periods){
			Game.update(game._id, {$set:{gameover: "endperiod"}})
			return {gameover: "endperiod"};
		}
		var newLocation = data.newLocation;
		if(!planets.includes(newLocation)){
			return;
		}
		var d = new Date();
		var today = moment(d).format("ll");
		var newPlayedLast = today;
		var newBounty = null;
		var loanRate = 1.18;
		if(game.wookie == true){
			loanRate = 1.09;
		}
		var newLoan = game.loan * loanRate;
		newLoan = parseInt(newLoan);
		var newLoadPeriod = 0;
		if(game.loan != 0){
			newLoadPeriod = game.loanPeriods + 1;
		}
		if(newLoadPeriod > 9){
			newBounty = true;
		}
		var newPeriod = game.currentPeriod + 1;
		var newContraband = game.contraband;
		//
		//random actions-------
		//
		var cheap = false;
		if(Math.floor(Math.random()*10) >=5){
			cheap = true;
		}
		var singleOfDozen = Math.floor(Math.random()*12);
		var countOfDozen = 0;
		var singleOfDozenName;
		for(c in newContraband){
			if(singleOfDozen == countOfDozen){
				if(cheap){
					newContraband[c].price = Math.floor(randomPrice((contrabandList[c].min*0.2),contrabandList[c].min,Math.random()));
				}
				else{
					newContraband[c].price = Math.floor(randomPrice(contrabandList[c].max,(contrabandList[c].max*5),Math.random()));
				}
				singleOfDozenName = newContraband[c].name;
			}
			else{
				newContraband[c].price = randomPrice(contrabandList[c].min,contrabandList[c].max,Math.random());
			}
			countOfDozen = countOfDozen + 1;
		}

		//first wookie 5, wookieluck, wookiebetrayal ::::::: random
		//bounty, bountydead----
		//ship damage, mugged, asteroid field-----
		var newWookie = false;
		var wookieFlipout = false;
		var wookieLuck = false;
		if(game.wookie == false){
			var c = Math.floor(Math.random()*30);
			if(c == 0){
				Game.update(game._id, {$set: {wookie: true}});
				newWookie = true;
			}
		}
		else if(game.wookie == true){
			var c = Math.floor(Math.random()*100);
			if(game.contraband["ws"].qty > 0){
				wookieFlipout = true;
				Game.update(game._id, {$set:{
					wookie: "Betrayal",
					currentHealth: Math.floor(game.currentHealth/2),
					credits: Math.floor(game.credits/2)
				}})
			}
			else if(c < 10){
				wookieLuck = true;
				Game.update(game._id, {$set: {credits: Math.floor(game.credits*1.05)}})
			}
		}

		//bounty
		if(newBounty && game.loanPeriods >=12){
			Game.update(game._id, {$set: {gameover: "bountydead"}});
			return{
				gameover: "bountydead"
			}
		}
		//dangers
		var shipDamage = false;
		var r = Math.random();
		var damage = Math.floor(Math.random() * 20)+1;
		if(r < shipDefense[ships.indexOf(game.ship)]){
			shipDamage = true;
			if(game.currentHealth - damage <= 0){
				Game.update(game._id, {$set: {gameover: "shipdead"}});
				return{
					gameover: "shipdead"
				}
			}
			else{
				Game.update(game._id, {$set: {currentHealth: game.currentHealth - damage}})
			}
		}


		Game.update(game._id, {
			$set: {
				currentPeriod: newPeriod,
				currentLocation: newLocation,
				playedLast: newPlayedLast,
				bounty: newBounty,
				loan: newLoan,
				loanPeriods: newLoadPeriod,
				contraband: newContraband,
				priceOutlier: {
					cheap: cheap,
					name: singleOfDozenName
				}
			}
		})
		//check randoms
		//cheap, crackdown ****special property -priceOutlier- reads from random stories
		return {
			priceOutlier: true,
			newWookie: newWookie,
			wookieFlipout: wookieFlipout,
			wookieLuck: wookieLuck,
			newBounty: newBounty,
			shipDamage: shipDamage
		}
		

	},
	'game.buyContraband':function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		var game = Game.findOne({_id: data.gameID});
		if(!game){
			return;
		}
		if(game.metID != user){
			return;
		}
		var buy = data.buy;
		var contraband = game.contraband;
		var x = data.c;

		var price = contraband[x].price;

		var qty = buy;

		var cost = price*qty;
		cost = parseInt(cost);

		if(game.credits < cost){
			return;
		}
		var newCredits = game.credits - cost;
		var z = contraband[x].qty + qty;

		var total = 0;
		for(c in contraband){
			total = total + contraband[c].qty;
		}
		if(total+qty > game.cargoSpace){
			return;
		}
		contraband[x].qty = z;
		Game.update(game._id, {$set: {credits:newCredits}});
		
		Game.update(game._id, {$set: {contraband: contraband}});

	},
	'game.removeGame':function(gid){
		const user = this.userId;
		if(!user){
			return;
		}
		var game = Game.findOne({_id: gid});
		if(!game){
			return;
		}
		if(game.metID != user){
			return;
		}
		return Game.remove(gid);
	},
	'game.payLoan':function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		var game = Game.findOne({_id: data.gameID});
		if(!game){
			return;
		}
		if(game.metID != user){
			return;
		}
		if(game.credits < data.payDown){
			return;
		}
		if(data.payDown > game.loan){
			return;
		}
		if(isNaN(data.payDown)){
			return;
		}

		Game.update(game._id, {$set: {loan: game.loan - data.payDown, credits: game.credits - data.payDown}});
	},
	'game.getLoan':function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		var game = Game.findOne({_id: data.gameID});
		if(!game){
			return;
		}
		if(game.metID != user){
			return;
		}
		if(isNaN(data.newLoan)){
			return;
		}
		var newLoan = parseInt(data.newLoan);

		if((newLoan + game.loan) > (game.currentPeriod * 5000)){
			return;
		}
		
		Game.update(game._id, {$set: {loan: game.loan + newLoan, credits: game.credits + newLoan}});
	},
	'game.sellContraband':function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		var game = Game.findOne({_id: data.gameID});
		if(!game){
			return;
		}
		if(game.metID != user){
			return;
		}
		var sell = data.sell;
		var contraband = game.contraband;
		var x = data.c;

		var price = contraband[x].price;
		console.log(price);
		var qty = sell;
		console.log(qty)
		var cost = price*qty;
		cost = parseInt(cost);
		console.log(cost)
		var newCredits = game.credits + cost;
		var z = contraband[x].qty - qty;
		if(z < 0){
			return;
		}
		contraband[x].qty = z
		Game.update(game._id, {$set: {credits:newCredits}});
		Game.update(game._id, {$set: {contraband: contraband}});

	},
	'game.buyShip':function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		var game = Game.findOne({_id: data.gameID});
		if(!game){
			return;
		}
		if(game.metID != user){
			return;
		}
		if(!(data.sv == 1 || data.sv == 2 || data.sv == 3)){
			return;
		}
		if(game.credits < shipPrice[data.sv]){
			return;
		}
		if(data.sv <= ships.indexOf(game.ship)){
			return;
		}
		var newCredits = game.credits - shipPrice[data.sv];
		Game.update(game._id, {$set: {credits: newCredits, ship: ships[data.sv],
		 shipHealth: shipHealth[data.sv], shipPicture: shipPictures[data.sv],
		 cargoSpace: shipSpace[data.sv], currentHealth: shipHealth[data.sv]}})
	},
	'game.buyHideout':function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		var game = Game.findOne({_id: data.gameID});
		if(!game){
			return;
		}
		if(game.metID != user){
			return;
		}
		if(!(data.sv == 1 || data.sv == 2 || data.sv == 3 || data.sv == 4 || data.sv == 5)){
			return;
		}
		if(game.credits < hideoutPrice[data.sv]){
			return;
		}
		if(data.sv <= hideouts.indexOf(game.hideout)){
			return;
		}
		var newCredits = game.credits - hideoutPrice[data.sv];
		Game.update(game._id, {$set: {
			credits: newCredits,
			hideout: hideouts[data.sv],
			hideoutPicture: hideoutPictures[data.sv],

		}})
	},
	'game.buyHealth':function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		var game = Game.findOne({_id: data.gameID});
		if(!game){
			return;
		}
		if(game.metID != user){
			return;
		}
		if(game.credits < 15000){
			return
		}
		var newCredits = game.credits - 15000;
		var newHealth = game.currentHealth + 15;
		if(newHealth > 100){
			newHealth = 100;
		}
		Game.update(game._id, {$set:{
			credits: newCredits,
			currentHealth: newHealth
		}})
	}
});






// game = {
// 	metID: user
// created: datetime
// gamename: string
// credits: number
// loan: number
// period: number
// contrabandPrices: {all names key with value price}
// contrabandOwned: {all names key with value amount}
// currentLocation: string
// ship: string
// hideout: string
// defense: string
// cargoSpace: number
// wookie: boolean
// }





