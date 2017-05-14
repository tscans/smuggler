import {Game} from '../imports/collections/game';

Meteor.startup(() => {
	console.log('Smuggler Server Online');
	Meteor.publish('allGames', function(){
		const user = this.userId;
		if(!user){
			return;
		}
		return Game.find({ metID: user });
	});
	Meteor.publish('oneGame', function(gameID){
		const user = this.userId;
		if(!user){
			return;
		}
		var game = Game.findOne({_id: gameID});
		if(!game){
			return;
		}
		if(game.metID != user){
			return;
		}
		return Game.find({ _id: gameID });
	});
});