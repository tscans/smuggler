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
		if(!game){
			return;
		}
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
		var allWorths = [];
		for(var i = 0; i< returnBoard.length;i++){
			allWorths.push(returnBoard[i].netWorth);
		}
		Array.min = function( array ){
		    return Math.min.apply( Math, array );
		};
		var minimum = Array.min(allWorths);
		var zz;

		for(var i = 0; i < returnBoard.length;i++){
			if(returnBoard[i].netWorth == minimum){
				zz = returnBoard[i]._id;
			}
		}
		console.log(zz);

		if(returnBoard.length < 10){
			Game.remove(game._id);
			return Leaderboard.insert({
				metID: user,
				game: game,
				netWorth: netWorth
			});
		}
		console.log(netWorth > minimum, minimum);
		if(netWorth > minimum){
			Leaderboard.remove(zz);
			Game.remove(game._id);
			return Leaderboard.insert({
				metID: user,
				game: game,
				netWorth: netWorth
			});
		}
		else{
			Game.remove(game._id);
			throw new Meteor.Error(509, 'You did not make it to the leaderboard.');
			return;

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





