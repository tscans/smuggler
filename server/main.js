import { Meteor } from 'meteor/meteor';
import { Profile } from '../imports/collections/profile';

Meteor.startup(() => {
	Meteor.publish('profile', function(){
		return Profile.find({ metID: this.userId });
	});
	
});
