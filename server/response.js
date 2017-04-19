import {Profile} from '../imports/collections/profile';
import {Page} from '../imports/collections/page';
import {Response} from '../imports/collections/response';
import moment from 'moment';

Meteor.methods({
	"response.makeResponse":function(){
		const user = this.userId;
		if(!user){
			return;
		}
		//type is scale (s) or open (o) question
		Response.insert({
			metID: user,
			pageID: page._id,
			surveyID: data.surveyID,
			questionID: data.questionID,
			answerScale: data.answerScale,
			answerOpen: data.answerOpen
		});
	}
});