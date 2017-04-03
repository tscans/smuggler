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
		var geo = new GeoCoder({
		  geocoderProvider: "google",
		  httpAdapter: "https",
		  apiKey: 'AIzaSyDiB46mtiODcY3yz9kcWM5eIDcqLAgw3xo'
		});

		var result;
		try {
		  Meteor.wrapAsync(result = geo.geocode(data.address));

		} catch(error) {

		  console.log(error)
		}

		console.log('making page')
		Page.insert({
			metID: user,
			email: data.email,
			ownerName: data.ownerName,
			address: result[0].formattedAddress,
			long: result[0].longitude,
			lat: result[0].latitude,
			createdAt: today,
			pageName: data.pageName,
			about: data.about,
			phone: data.phone,
			website: data.website,
			online: true,
			mcfan: [],
			image: "http://localhost:3000/mainlogo.png"
		},function(error,data){
			if(error){
				console.log(error);
			}
			else{
				Profile.update(profile._id, {$set: {page:data}})
			}
		});
		console.log('done updating')
	}
});