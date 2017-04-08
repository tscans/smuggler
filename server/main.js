import { Meteor } from 'meteor/meteor';
import { Profile } from '../imports/collections/profile';
import { Page } from '../imports/collections/page';
import { Deal } from '../imports/collections/deal';
import moment from 'moment';

Meteor.startup(() => {
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
	Meteor.publish('localDeals', function(range, day){
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
		if(day){
			var d = new Date();
			var a = moment(d);
			var b = moment(day);
			var c = a.diff(b, 'days')   // =1
			if(c > 4 || c < -4){
				return;
			}
		}
		else{
			var d = new Date();
			day = moment(d).format("ll");
		}
		
		return Deal.find({
			date: day,
			long: {$gt: (profile.long-range), $lt: (profile.long+range)}, lat: {$gt: (profile.lat-range), $lt: (profile.lat+range)}
		})
	});
	Meteor.publish('singleLocalDeals', function(pageID){
		var user = this.userId;
		if(!user){
			return;
		}
		console.log(pageID)
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
});




