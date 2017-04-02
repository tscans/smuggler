import {Profile} from '../imports/collections/profile';
import {Page} from '../imports/collections/page';
import moment from 'moment';
var cloudinary = require('cloudinary');

Meteor.methods({
	'page.makePage': function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		var d = new Date();
		var today = moment(d).format("ll");
		var profile = Profile.findOne({metID: user});
		if(!profile){
			return;
		}
		if(profile.page){
			return;
		}
		
		Page.insert({
			metID: user,
			email: data.email,
			ownerName: data.ownerName,
			address: data.address,
			long: data.long,
			lat: data.lat,
			createdAt: today,
			pageName: data.pageName,
			about: data.about,
			phone: data.phone,
			website: data.website,
			image: "http://localhost:3000/mainlogo.png"
		},function(error,data){
			if(error){
				console.log(error);
			}
			else{
				Profile.update(profile._id, {$set: {page:data}})
			}
		});
	}
});