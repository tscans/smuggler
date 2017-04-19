import {Profile} from '../imports/collections/profile';
import {Page} from '../imports/collections/page';
import {Survey} from '../imports/collections/survey';
import {Response} from '../imports/collections/response';
import {Question} from '../imports/collections/question';
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
	},
	"response.submitSurvey":function(pageID, surveyID, data){
		const user = this.userId;
		if(!user){
			return;
		}
		console.log('got it here no problem')
		var page = Page.findOne({_id: pageID});
		var survey = Survey.findOne({_id: surveyID});
		if(!page){
			return;
		}
		if(!survey){
			return;
		}
		if(survey.pageID != page._id){
			return;
		}
		//qid,answer,type

		// 	metID: user,
		// 	pageID: page._id,
		// 	surveyID: data.surveyID,
		// 	title: "",
		// 	type: data.type

		for(var i = 0; i < data.length; i++){
			var question = Question.findOne({_id: data[i].qid});
			if(question._id != data[i].qid){
				return;
			}
			if(question.surveyID != surveyID){
				return;
			}
			if(question.type != data[i].type){
				return;
			}
			if(data[i].type == "o"){
				Response.insert({
					metID: user,
					pageID: page._id,
					surveyID: survey._id,
					questionID: data[i].qid,
					answerScale: null,
					answerOpen: data[i].answer
				});
			}
			else if(data[i].type == "s"){
				Response.insert({
					metID: user,
					pageID: page._id,
					surveyID: survey._id,
					questionID: data[i].qid,
					answerScale: data[i].answer,
					answerOpen: null
				});
			}
			
		}
		Survey.update(survey._id,{$push:{userResponders:user}});
		console.log('ungbnkk')
	}
});





