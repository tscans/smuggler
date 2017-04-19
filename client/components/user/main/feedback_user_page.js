import React from 'react';
import {browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';
import {Page} from '../../../../imports/collections/page';
import {Survey} from '../../../../imports/collections/survey';

class FeedbackUserPage extends React.Component{
	listSurveys(){
		if(this.props.surveys.length == 0){
			return(
				<div>
					No Surveys at This Time
				</div>
			)
		}
		return this.props.surveys.map(s=>{
			return(
				<div key={s._id}>
					<p className="buttons-row my-crunch-btn">
					  <a href="#" className="button button-raised color-green" onClick={()=>{browserHistory.push("/user/feedback/"+this.props.params.pageID+"/survey/"+s._id+"/")}}>{s.surveyName}</a>
					</p>
				</div>
			)
		})
	}
	sendMessage(p){
		//pageid, message are params
		var myApp = new Framework7();
		var data = {};
		data.pageID = p._id;
		data.message = this.refs.message.value.trim();
		Meteor.call("message.makeMessage", data, (error,data)=>{
			if(error){
				console.log(error);
				myApp.alert(error.message, `Warning!`);
			}
			else{
				console.log(data);
				this.refs.message.value = "";
                
		        myApp.closeModal();
			}
		})
	}
	messagePop(p){
		return(
			<div className="popup popup-about">
				<div className="navbar theme-green my-card-3">
                    <div className="navbar-inner">
                        <div className="right my-left-5">
                        	<a href="#" className="close-popup">
                        		<i className="fa fa-times color-white"></i>
                        	</a>
                        </div>
                        <div className="right">
                    		Message: {p.pageName}
                    	</div>
                    </div>
                </div>
			    <div className="content-block">
			      <p>Send a message to {p.pageName}. After reviewing it, {p.pageName} may choose to post it to their page under reviews.</p>
			      <div className="list-block">
				      <ul>
				      <li className="item-content">
	                        <div className="item-inner">
	                          <div className="item-title label">Message</div>
	                          <div className="item-input">
	                              <textarea ref="message" placeholder="Drop a note"></textarea>
	                          </div>
	                        </div>
	                      </li>
	                  </ul>
                  </div>
                  <p className="buttons-row my-crunch-btn">
					  <a href="#" className="button button-fill color-blue" onClick={()=>{this.sendMessage(p)}}>Submit</a>
				  </p>
			    </div>
			</div>
		)
	}
	popMessage(){
		var myApp = new Framework7();

		myApp.popup('.popup-about');
	}
	render(){
		var pageID = this.props.params.pageID;
		var p = null;
		for(var i = 0; i< this.props.pages.length; i++){
			if(this.props.pages[i]._id == pageID){
				p = this.props.pages[i];
				break;
			}
		}
		if(!p || !this.props.surveys){
			return<div></div>
		}
		return(
			<div>
				<p className="buttons-row my-btn-up">
				  <a href="#" className="button button-raised color-green" onClick={()=>{browserHistory.push("/user/feedback/")}}>Go Back</a>
				</p>
				<h2>{p.pageName}</h2>
				{this.messagePop(p)}
				<p className="buttons-row my-crunch-btn">
				  <a onClick={()=>{this.popMessage(p)}} href="#" className="button button-fill color-green">Drop a Note</a>
				</p>
				<h3>Take a Survey</h3>
				{this.listSurveys()}

			</div>
		)
	}
}

export default createContainer((props)=>{
    Meteor.subscribe("localPages")
    Meteor.subscribe('profile');
    Meteor.subscribe("pageSurveys", props.params.pageID);

    return {profile: Profile.findOne({}), pages: Page.find({}).fetch(), surveys: Survey.find({}).fetch()}

	
}, FeedbackUserPage); 




 