import {Profile} from '../imports/collections/profile';
var zipcodes = require('zipcodes');
import moment from 'moment';

Meteor.methods({
	'profile.makeUser': function(name, zip){
		const user = Meteor.users.findOne(this.userId)._id;
		var profile = Profile.findOne({ownerId: user});
		if(profile){
			console.log("User already exists")
			throw new Meteor.Error(510, 'User with email already exists.');
			return;
		}
		var d = new Date();
		var today = moment(d).format("ll");
		var zippy = zipcodes.lookup(zip);
		var proEmail = Meteor.user().emails[0].address.toLowerCase();
		var random = Math.floor(Math.random() * (999999 - 111111)) + 111111;
		Profile.insert({
			metID: user,
			email: proEmail,
			name: name,
			zip: zip,
			mcbook: [],
			createdAt: today,
			long: zippy.longitude,
			lat: zippy.latitude,
			admin: false,
			code: random,
			verified: false,
			page: null,
		});
	},
});