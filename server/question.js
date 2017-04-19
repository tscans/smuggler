import {Profile} from '../imports/collections/profile';
import {Page} from '../imports/collections/page';
import {Survey} from '../imports/collections/survey';
import {Question} from '../imports/collections/question';
import moment from 'moment';

Meteor.methods({
	"question.makeQuestion":function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		//type is scale (s) or open (o) question
		var survey = Survey.findOne({_id: data.surveyID});
		if(!survey){
			return;
		}
		var questions = Question.find({surveyID: survey._id}).fetch();
		if((questions.length + 1) > 5){
			throw new Meteor.Error(512, 'Only 5 questions per Survey!');
			return;
		}
		var page = Page.findOne({metID: user});
		if(!page){
			return;
		}
		Question.insert({
			metID: user,
			pageID: page._id,
			surveyID: data.surveyID,
			title: "",
			type: data.type
		});
	},
	"question.deleteQuestion":function(qid){
		const user = this.userId;
		if(!user){
			return;
		}
		var question = Question.findOne({_id: qid});
		if(!question){
			return;
		}
		if(question.metID != user){
			return;
		}
		Question.remove(qid);
	},
	"question.updateQuestion":function(data){
		const user = this.userId;
		if(!user){
			return;
		}
		var question = Question.findOne({_id: data.qid});
		if(!question){
			return;
		}
		if(question.metID != user){
			return;
		}
		Question.update(question._id,{$set:{title: data.title}});
	}
});






