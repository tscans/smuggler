import {Deal} from '../imports/collections/deal';
import {Profile} from '../imports/collections/profile';
import {Page} from '../imports/collections/page';
import moment from 'moment';
var cloudinary = require('cloudinary');

Meteor.methods({
	'api.deal':function(did){
		const user = this.userId;
		if(!user){
			return;
		}
		var deal = Deal.findOne({_id: did});
		if(!deal){
			return;
		}
		return deal;
	}
});












