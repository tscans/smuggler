import {Deal} from '../imports/collections/deal';
import {Profile} from '../imports/collections/profile';
import {Page} from '../imports/collections/page';
import {Message} from '../imports/collections/message';
import moment from 'moment';

Meteor.methods({
	'message.makeMessage':function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		var page = Page.findOne({_id: data.pageID});
		if(!page){
			return;
		}
		var profile = Profile.findOne({metID: user});
		var d = new Date();
		var today = moment(d).format("ll");
		Message.insert({
			metID: user,
			pageID: data.pageID,
			message: data.message,
			createdAt: today,
			name: profile.name

		})
	},
	'message.deleteMessage':function(messageID){
		const user = this.userId;
		if(!user){
			return;
		}
		var page = Page.findOne({metID: user});
		if(!page){
			return;
		}
		var message = Message.findOne({_id: messageID});
		if(message.pageID != page._id){
			return;
		}
		Message.remove(message._id);
	}
});
















