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








