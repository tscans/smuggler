import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';
import {Page} from '../../../../imports/collections/page';
import {Message} from '../../../../imports/collections/message';
import {Survey} from '../../../../imports/collections/survey';
import FeedbackMessages from './feedback_messages';
import ManageFeedback from './manage_feedback';

class FeedbackPage extends Component {
	viewMessages(){
		var myApp = new Framework7();
		myApp.popup('.popup-messages');
	}
	manageReviews(){
		var myApp = new Framework7();
		myApp.popup('.popup-manage');
	}
	createSurvey(){
		Meteor.call("survey.createSurvey", (error,data)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log(data);
				browserHistory.push("/page/feedback/"+data+"/");
			}
		})
	}
	viewSurvey(){
		browserHistory.push("/page/manage/")
	}
	renderPops(){
		return(
			<div>
				<div className="popup popup-messages">
				    <FeedbackMessages messages={this.props.messages}/>
				</div>
				<div className="popup popup-manage">
				    <ManageFeedback page={this.props.page}/>
				</div>
			</div>
		)
	}
	deleteSurvey(s){
		var myApp = new Framework7();
		myApp.confirm('Delete '+s.surveyName+"?", function () {
	        Meteor.call("survey.deleteSurvey", s._id, (error,data)=>{
	        	if(error){
	        		console.log(error);
	        	}
	        	else{
	        		myApp.alert('Survey Deleted');
	        	}
	        })
	    });
	}
	renderSurveys(){
		return this.props.surveys.map(s=>{
			return(
				<div key={s._id}>
					<p className="buttons-row my-btn-5">
					  <a href="#" className="button button-big color-teal button-raised my-btn-80" onClick={()=>browserHistory.push("/page/feedback/"+s._id+"/")}>{s.surveyName}</a>
					  <a href="#" className="button button-big color-red button-raised my-btn-20" onClick={()=>{this.deleteSurvey(s)}}>x</a>
					</p>
				</div>
			)
		})
	}
    render() {
    	if(!this.props.page){
    		return<div></div>
    	}
        return (
        	<div>
        		{this.renderPops()}
        		<h1>Feedback</h1>
        		<div className="go-fucking-center">
					<p className="buttons-row">
					  <a href="#" className="button button-big button-fill button-raised color-green" onClick={this.viewMessages.bind(this)}>View Messages - {this.props.messages.length}</a>
					</p>
					<p className="buttons-row">
						<a href="#" className="button button-big button-fill button-raised color-red" onClick={this.manageReviews.bind(this)}>Manage Reviews - {this.props.page.selectedMessages.length}</a>
					</p>
					<p className="buttons-row">
						<a href="#" className="button button-big button-raised color-black" onClick={this.viewSurvey.bind(this)}>View Survey Data</a>
					</p>
					<h2>Current Surveys</h2>
					{this.renderSurveys()}
					<div>
						<p className="buttons-row my-crunch-btn">
						  <a href="#" className="button button-big button-fill button-raised color-teal" onClick={this.createSurvey.bind(this)}>Create a Survey</a>
						</p>
					</div>
				</div>
        	</div>
        );
    }
}

export default createContainer((props)=>{
    Meteor.subscribe("profile");
    Meteor.subscribe('pageMessages');
    Meteor.subscribe("ownPage");
    Meteor.subscribe("ownSurveys");

    return {profile: Profile.findOne({}), page: Page.findOne({}), messages: Message.find({}).fetch(), surveys: Survey.find({}).fetch()}

	
}, FeedbackPage);  








