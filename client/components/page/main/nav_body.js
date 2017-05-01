import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';
import {Page} from '../../../../imports/collections/page';

class NavBody extends Component {
	sendUser(){
		var myApp = new Framework7();
 
	    myApp.closePanel();
	    browserHistory.push("/user/");
	}
	toDeals(){
		var myApp = new Framework7();
 
	    myApp.closePanel(false);
		browserHistory.push("/page/deals/");
	}
	toFeedback(){
		var myApp = new Framework7();
 
	    myApp.closePanel();
		browserHistory.push("/page/feedback/");
	}
	toManage(){
		var myApp = new Framework7();
 
	    myApp.closePanel();
		browserHistory.push("/page/manage/");
	}
	toUser(){
		var myApp = new Framework7();
 
	    myApp.closePanel(false);
		browserHistory.push("/user/");
	}
	toVerify(){
		var myApp = new Framework7();
 
	    myApp.closePanel(false);
		browserHistory.push("/page/verify/");
	}
	toUpdate(){
		var myApp = new Framework7();
 
	    myApp.closePanel();
		browserHistory.push("/page/update/");
	}
	logout(event){
        event.preventDefault();
        var myApp = new Framework7();
	    myApp.closePanel(false);
	    myApp.closeModal();
        Meteor.logout();
        this.handleLogoutPush();
    }
    handleLogoutPush(){
    	var myApp = new Framework7();
    	browserHistory.push('/');
        myApp.alert(``,`Logged Out`);
    }
    render() {

    	if(!this.props.profile){
    		return(<div></div>)
    	}
    	var userStyle = {
    		marginTop: "15vh"
    	}
    	if(!this.props.profile.page || !this.props.profile.businessCard){
    		return(
    			<div>
	    			<p className="buttons-row">
					  <a href="#" className="button" onClick={this.toVerify.bind(this)}>Verify</a>
					</p>
    				<p className="buttons-row">
					  <a href="#" className="button color-green" onClick={this.logout.bind(this)}>Logout</a>
					</p>   
				    <div className="list-block-label">Veer Copyright 2017</div>
				    <p className="buttons-row" style={userStyle}>
					  <a href="#" className="button color-red" onClick={this.toUser.bind(this)}>Back to User</a>
					</p> 
    			</div>
    		)
    	}
        return (
        	<div>
        		<p className="buttons-row">
				  <a href="#" className="button" onClick={this.toDeals.bind(this)}>Deals</a>
				</p>
				<p className="buttons-row">
				  <a href="#" className="button" onClick={this.toFeedback.bind(this)}>Feedback</a>
				</p> 
				<p className="buttons-row">
				  <a href="#" className="button" onClick={this.toManage.bind(this)}>Manage</a>
				</p> 
				<p className="buttons-row">
				  <a href="#" className="button" onClick={this.toUpdate.bind(this)}>Update Info</a>
				</p> 
				<p className="buttons-row">
				  <a href="#" className="button color-green" onClick={this.logout.bind(this)}>Logout</a>
				</p>   
				<div className="list-block-label">Veer Copyright 2017</div>
				<p className="buttons-row" style={userStyle}>
				  <a href="#" className="button color-red" onClick={this.toUser.bind(this)}>Back to User</a>
				</p> 
			</div>
        );
    }
}

export default createContainer((props)=>{
    Meteor.subscribe("profile");
    Meteor.subscribe("ownPage");

    return {profile: Profile.findOne({}), page: Page.findOne({})}

    
}, NavBody);
