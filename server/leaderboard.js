import {Game} from '../imports/collections/game';
import moment from 'moment';
import {Leaderboard} from '../imports/collections/leaderboard';

Meteor.methods({
	'leaderboard.enter':function(gameID){
		const user = this.userId;
		if(!user){
			return;
		}
		var game = Game.findOne({_id: gameID});
		var credits = game.credits;
		var loan = game.loan;
		var ships = ["Kessel Vessel", "Bespin Shuttle", "Corellian Starship", "Nubian Yacht"];
		var shipPrice = [0,200000,1000000,10000000];

		var hideouts = ["No Hideout","Kessel Mine", "Tatooine Flats", "Bespin Condo", "Naboo Palace", "Coruscant Penthouse"];
		var hideoutPrice = [0,50000,150000,500000,5000000,50000000];
		var ship = shipPrice[ships.indexOf(game.ship)];
		var hideout = hideoutPrice[hideouts.indexOf(game.hideout)];
		var netWorth = credits + ship + hideout - loan;
		var returnBoard = Leaderboard.find({}).fetch();
		var newLeader = false;
		var low = 0;
		var j = 0;
		for(var i = 0; i <returnBoard.length;i++){
			if(returnBoard[i].netWorth < returnBoard[i + 1].netWorth){
				low = returnBoard[i].netWorth;
				j = i;
			}
		}
		if(low < netWorth){
			newLeader = true;
		}
		if(returnBoard.length < 15){
			newLeader = true;
		}
		if(newLeader){
			return Leaderboard.insert({
				metID: user,
				game: game,
				netWorth: netWorth
			});
		}
		else{
			Leaderboard.remove(j);
			throw new Meteor.Error(509, 'You did not make it to the leaderboard.');
		}
		
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





