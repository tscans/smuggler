import {Profile} from '../imports/collections/profile';
import {Page} from '../imports/collections/page';
import {Message} from '../imports/collections/message';
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
			selectedMessages: [],
			surveys: [],
			online: true,
			favorites: 0,
			image: "/mainlogo.png"
		},function(error,data){
			if(error){
				console.log(error);
			}
			else{
				Profile.update(profile._id, {$set: {page:data}})
			}
		});
		console.log('done updating')
	},
	"page.favorite":function(pageID){
		const user = this.userId;
		if(!user){
			return;
		}
		var profile = Profile.findOne({metID: user});
		var page = Page.findOne({_id: pageID});
		if(!page){
			return;
		}
		if(profile.favorite.includes(page._id)){
			Profile.update(profile._id, {$pull:{favorite: page._id}});
			Page.update(pageID, {$inc: {favorites: -1}});

		}
		else{
			Profile.update(profile._id, {$push: {favorite: page._id}});
			Page.update(pageID, {$inc: {favorites: 1}});
		}
	},
	"page.selectedMessageAdd":function(messageID){
		const user = this.userId;
		if(!user){
			return;
		}
		var message = Message.findOne({_id: messageID});
		if(!message){
			return;
		}
		var page = Page.findOne({metID: user});
		if(!page){return;}
		if(page.selectedMessages.length > 4){
			throw new Meteor.Error(511, 'Only 5 Reviews per page');
			return;
		}
		
		Page.update(page._id, {$push: {selectedMessages: message}});
		Message.remove(message._id);
	},
	"page.selectedMessageRemove":function(messageID){
		const user = this.userId;
		if(!user){
			return;
		}
		var page = Page.findOne({metID: user});
		if(!page){return;}
		var message;
		for(var i = 0; i<page.selectedMessages.length;i++){
			if(messageID == page.selectedMessages[i]._id){
				message = page.selectedMessages[i];
				break;
			}
		}
		Page.update(page._id,{$pull: {selectedMessages: message}});
	}
});

















