import {Profile} from '../imports/collections/profile';
import {Deal} from '../imports/collections/deal';
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
			book: [],
			createdAt: today,
			long: zippy.longitude,
			lat: zippy.latitude,
			admin: false,
			code: random,
			verified: false,
			favorite: [],
			page: null,
		});
	},
	"profile.book": function(did){
		const user = this.userId;
		if(!user){
			return;
		}
		var deal = Deal.findOne({_id: did});
		if(!deal){
			return;
		}
		var profile = Profile.findOne({metID: user});
		if(profile.book.includes(did)){
			Profile.update(profile._id, {$pull: {book: did}});
		}
		else{
			Profile.update(profile._id, {$push: {book: did}});
		}
	},
	"profile.newLocation":function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		var profile = Profile.findOne({metID: user});
		if(!profile){
			return;
		}
		Profile.update(profile._id, {$set: {long: data.long, lat: data.lat}});
	},
	"profile.removeOld":function(did){
		const user = this.userId;
		if(!user){
			return;
		}
		var profile = Profile.findOne({metID: user});
		Profile.update(profile._id, {$pull: {book: did}});
	}
});







