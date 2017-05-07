import {Profile} from '../imports/collections/profile';
import {Page} from '../imports/collections/page';
import {Job} from '../imports/collections/job';
import moment from 'moment';
var cloudinary = require('cloudinary');

Meteor.methods({
	'job.makeJob':function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		var page = Page.findOne({metID: user});
		if(!page){
			return;
		}
		var d = new Date();
		var today = moment(d).format("ll");
		Job.insert({
			metID: user,
			pageID: page._id,
			pageName: page.pageName,
			title: data.title,
			description: data.description,
			benefits: data.benefits,
			requirements: data.requirements,
			datePosted: today,
			picture: page.image,
			address: page.address,
			createdAt: today,
			long: page.long,
			lat: page.lat,
			contactEmail: data.email,
			contactPhone: data.phone
		})
	},
	'job.deleteJob':function(jid){
		const user = this.userId;
		if(!user){
			return;
		}
		var job = Job.findOne({_id: jid});
		if(!job){
			return;
		}
		if(user != job.metID){
			return;
		}
		Job.remove(job);
	}
});