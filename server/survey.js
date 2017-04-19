import {Deal} from '../imports/collections/deal';
import {Profile} from '../imports/collections/profile';
import {Page} from '../imports/collections/page';
import {Survey} from '../imports/collections/survey';
import moment from 'moment';

Meteor.methods({
	"survey.createSurvey":function(){
		const user = this.userId;
		if(!user){
			return;
		}
		var page = Page.findOne({metID: user});
		var d = new Date();
		var today = moment(d).format("ll");

		return Survey.insert({
			metID: user,
			pageID: page._id,
			surveyName: "Unnamed Survey",
			surveyDetails: "",
			createdAt: today,
			userResponders: [],
			published: false
		})
	},
	"survey.deleteSurvey":function(sid){
		const user = this.userId;
		if(!user){
			return;
		}
		var survey = Survey.findOne({_id: sid});
		if(survey.metID != user){
			return;
		}
		Survey.remove(sid);
	},
	"survey.editSurvey":function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		var survey = Survey.findOne({_id: data.sid});
		if(!survey){
			return;
		}
		if(survey.metID != user){
			return;
		}
		Survey.update(survey._id,{$set:{surveyName: data.surveyName, surveyDetails: data.surveyDetails}});
	},
	"survey.handlePublish":function(surveyID){
		const user = this.userId;
		if(!user){
			return;
		}
		var survey = Survey.findOne({_id: surveyID});
		if(!survey){
			return;
		}
		if(survey.metID != user){
			return;
		}
		Survey.update(surveyID, {$set: {published: !survey.published}});
	}
});












