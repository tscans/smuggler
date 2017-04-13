import { Meteor } from 'meteor/meteor';
import { Profile } from '../imports/collections/profile';
import { Page } from '../imports/collections/page';
import { Deal } from '../imports/collections/deal';
import moment from 'moment';

Meteor.startup(() => {
	console.log("Server Online");
	var d = new Date();
	var yesterday = moment(d).add(-1,'day').format("ll");
	Meteor.setInterval(function() {
		//START of daily deal expiration check.
		
	    var d = new Date();
		var today = moment(d).format("ll");
		var twoDaysAgo = moment(d).add(-2,"day").format("ll");
		if(today!=yesterday){
			console.log('New Day', d);
			yesterday = today;
			var exDeals = Deal.find({date: twoDaysAgo}).fetch();
			console.log(exDeals.length, "Deals will go offline.")
			for(var i = 0; i< exDeals.length;i++){
				Deal.remove(exDeals[i]._id);
			}
		}
		
	}, 300000);
	//lets go every 5 mins ==== 5*60*1000 = 300,000

	Meteor.publish('profile', function(){
		return Profile.find({ metID: this.userId });
	});
	Meteor.publish('ownPage', function(){
		var user = this.userId;
		if(!user){
			return;
		}
		return Page.find({
			metID: user
		})
	});
	Meteor.publish('ownDeals', function(){
		var user = this.userId;
		if(!user){
			return;
		}
		return Deal.find({
			metID: user
		})
	});
	Meteor.publish('localDeals', function(range){
		var user = this.userId;
		if(!user){
			return;
		}
		var profile = Profile.findOne({metID: user});

		if(range){
			if(range > .2 || range < .05){
				return;
			}
		}
		else{
			var range = .12;
		}
		
		return Deal.find({
			long: {$gt: (profile.long-range), $lt: (profile.long+range)}, lat: {$gt: (profile.lat-range), $lt: (profile.lat+range)}
		})
	});
	Meteor.publish('singleLocalDeals', function(pageID){
		var user = this.userId;
		if(!user){
			return;
		}

		return Deal.find({pageID: pageID})
	});
	Meteor.publish('localPages', function(range){
		var user = this.userId;
		if(!user){
			return;
		}
		var profile = Profile.findOne({metID: user});

		if(range){
			if(range > .2 || range < .05){
				return;
			}
		}
		else{
			var range = .12;
		}

		return Page.find({
			long: {$gt: (profile.long-range), $lt: (profile.long+range)}, lat: {$gt: (profile.lat-range), $lt: (profile.lat+range)}
		})
	});
	Meteor.publish('bookDeals', function(){
		var user = this.userId;
		if(!user){
			return;
		}
		var profile = Profile.findOne({metID: user});
		return Deal.find({_id: {$in: profile.book}});
	});
});




