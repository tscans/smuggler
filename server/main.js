import { Meteor } from 'meteor/meteor';
import { Profile } from '../imports/collections/profile';
import { Page } from '../imports/collections/page';
import { Deal } from '../imports/collections/deal';

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
	Meteor.publish('localDeals', function(){
		var user = this.userId;
		if(!user){
			return;
		}
		var profile = Profile.findOne({metID: user});

		return Deal.find({

		})
	});
	Meteor.publish('localPages', function(){
		var user = this.userId;
		if(!user){
			return;
		}
		var profile = Profile.findOne({metID: user});

		return Page.find({

		})
	});
});
