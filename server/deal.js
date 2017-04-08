import {Deal} from '../imports/collections/deal';
import {Profile} from '../imports/collections/profile';
import {Page} from '../imports/collections/page';
import moment from 'moment';
var cloudinary = require('cloudinary');

Meteor.methods({
	'deal.makeDeal':function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		if(data.title == "" || data.details == ""){
			throw new Meteor.Error(504, 'Enter a title and detail.');
			return;
		}
		var d = new Date();
		var today = moment(d).format("ll");
		var date = moment(data.date).format("ll");
		var page = Page.findOne({metID: user});

		Deal.insert({
			metID: user,
			pageID: page._id,
			pageName: page.pageName,
			title: data.title,
			details: data.details,
			date: date,
			picture: "",
			address: page.address,
			upvotes: [],
			createdAt: today,
			randomicon: data.randomicon,
			randomcolor: data.randomcolor,
			long: page.long,
			lat: page.lat
		},function(error,did){
			if(error){
				console.log(error);
			}
			else{
				cloudinary.config({cloud_name: 'dee8fnpvt' , api_key: '723549153244873' , api_secret: 'rooq670hgNK0JnoOSpxnZ7vFtG8'});
				cloudinary.v2.uploader.upload("data:image/png;base64,"+data.pic, function(error, result){
					if(error){
						console.log(error)
						return;
					}
				},Meteor.bindEnvironment(function (error, result) {
					
				  	Deal.update(did, {$set: {
						picture: result.url,
						pictureID: result.public_id
					}})
				}));
			}
		})
		
	},
	"deal.deleteDeal":function(did){
		const user = this.userId;
		if(!user){
			return;
		}
		var deal = Deal.findOne({_id: did});
		if(deal.metID != user){
			return;
		}
		if(deal.picture != ""){
			cloudinary.config({cloud_name: 'dee8fnpvt' , api_key: '723549153244873' , api_secret: 'rooq670hgNK0JnoOSpxnZ7vFtG8'});
			cloudinary.uploader.destroy(deal.pictureID, function(result) { null }, 
                            { invalidate: true });
		}
		
		Deal.remove(did);
	},
	"deal.upvoteDeal":function(did){
		const user = this.userId;
		if(!user){
			return;
		}
		var deal = Deal.findOne({_id: did});
		if(deal.upvotes.includes(user)){
			Deal.update(did, {$pull: {upvotes: user}});
		}
		else{
			Deal.update(did, {$push: {upvotes: user}});
		}
	}
});












