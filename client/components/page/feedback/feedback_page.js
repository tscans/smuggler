import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';
import {Page} from '../../../../imports/collections/page';
import {Message} from '../../../../imports/collections/message';
import FeedbackMessages from './feedback_messages';
import ManageFeedback from './manage_feedback';
import CreateSurvey from './create_survey';

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
		var myApp = new Framework7();
		myApp.popup('.popup-create');
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
				<div className="popup popup-create">
				    <CreateSurvey />
				</div>
			</div>
		)
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
					  <a href="#" className="button button-big color-green">Messages - {this.props.messages.length}</a>
					  <a href="#" className="button button-big color-red">Posted Reviewes - {this.props.page.selectedMessages.length}</a>
					</p>
					<p className="buttons-row">
					  <a href="#" className="button button-big button-fill button-raised color-green" onClick={this.viewMessages.bind(this)}>View Messages</a>
					  <a href="#" className="button button-big button-fill button-raised color-red" onClick={this.manageReviews.bind(this)}>Manage Reviews</a>
					</p>
					<p className="buttons-row">
					  <a href="#" className="button button-big color-blue">Surveys - {this.props.page.surveys.length}</a>
					  <a href="#" className="button button-big color-black">Survey Respondants - 0</a>
					</p>
					<p className="buttons-row">
					  <a href="#" className="button button-big button-fill button-raised color-blue" onClick={this.createSurvey.bind(this)}>Create a Survey</a>
					  <a href="#" className="button button-big button-fill button-raised color-black" onClick={this.viewSurvey.bind(this)}>View Survey Data</a>
					</p>
				</div>
        	</div>
        );
    }
}

export default createContainer((props)=>{
    Meteor.subscribe("profile");
    Meteor.subscribe('pageMessages');
    Meteor.subscribe("ownPage");

    return {profile: Profile.findOne({}), page: Page.findOne({}), messages: Message.find({}).fetch()}

	
}, FeedbackPage);  








