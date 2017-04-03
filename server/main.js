import { Meteor } from 'meteor/meteor';
import { Profile } from '../imports/collections/profile';
import { Page } from '../imports/collections/page';

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
});
