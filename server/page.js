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
			online: true,
			favorites: 0,
			image: "/mainlogo.png"
		},function(error,data){
			if(error){
				console.log(error);
			}
			else{
				Profile.update(profile._id, {$set: {page:data}});
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
	"page.addImage":function(data){
		const user = this.userId;
		if(!user){
			return;
		}

		var page = Page.findOne({metID: user});

		if(!page){
			console.log('here1')
			return;
		}
		if(page.imageID){
			console.log('here2')
			cloudinary.config({cloud_name: 'dee8fnpvt' , api_key: '723549153244873' , api_secret: 'rooq670hgNK0JnoOSpxnZ7vFtG8'});
			cloudinary.uploader.destroy(page.imageID, function(result) { null }, 
                            { invalidate: true });
		}
		console.log(data.image.length);
		if(data.image.length > 50){
			console.log('here3')
			cloudinary.config({cloud_name: 'dee8fnpvt' , api_key: '723549153244873' , api_secret: 'rooq670hgNK0JnoOSpxnZ7vFtG8'});
			cloudinary.v2.uploader.upload("data:image/png;base64,"+data.image, function(error, result){
				if(error){
					console.log(error)
					return;
				}
			},Meteor.bindEnvironment(function (error, result) {
				Page.update(page._id, {$set:{
					image: result.url,
					imageID: result.public_id

				}});
			}));
		}
		else{
			throw new Meteor.Error(513, 'Image error');
			return;
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
	},
	"page.updatePageName":function(pageName){
		const user = this.userId;
		if(!user){
			return;
		}
		var page = Page.findOne({metID: user});
		Page.update(page._id,{$set:{pageName: pageName}});
	},
	"page.updateEmail":function(email){
		const user = this.userId;
		if(!user){
			return;
		}
		var page = Page.findOne({metID: user});
		Page.update(page._id,{$set:{email: email}});
	},
	"page.updateOwnerName":function(ownerName){
		const user = this.userId;
		if(!user){
			return;
		}
		var page = Page.findOne({metID: user});
		Page.update(page._id,{$set:{ownerName: ownerName}});
	},
	"page.updateAddress":function(address){
		const user = this.userId;
		if(!user){
			return;
		}
		var page = Page.findOne({metID: user});
		Page.update(page._id,{$set:{address: address}});
	},
	"page.updatePhone":function(phone){
		const user = this.userId;
		if(!user){
			return;
		}
		var page = Page.findOne({metID: user});
		Page.update(page._id,{$set:{phone: phone}});
	},
	"page.updateWebsite":function(website){
		const user = this.userId;
		if(!user){
			return;
		}
		var page = Page.findOne({metID: user});
		Page.update(page._id,{$set:{website: website}});
	},
	"page.updateAbout":function(about){
		const user = this.userId;
		if(!user){
			return;
		}
		var page = Page.findOne({metID: user});
		Page.update(page._id,{$set:{about: about}});
	}
});

















