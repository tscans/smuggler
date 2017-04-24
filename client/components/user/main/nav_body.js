import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class NavBody extends Component {
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
    toPage(){
		var myApp = new Framework7();
 
	    myApp.closePanel(false);
		browserHistory.push("/page/deals/");
	}
	toMap(){
		var myApp = new Framework7();
 
	    myApp.closePanel(false);
		browserHistory.push("/user/");
	}
	toFeedback(){
		var myApp = new Framework7();
 
	    myApp.closePanel(false);
		browserHistory.push("/user/feedback/");	
	}
    render() {
        return (
        	<div>
        		<p className="buttons-row">
				  <a href="#" className="button" onClick={this.toMap.bind(this)}>Specials</a>
				</p>
				<p className="buttons-row">
				  <a href="#" className="button" onClick={this.toFeedback.bind(this)}>Business Feedback</a>
				</p> 
				<p className="buttons-row">
				  <a href="#" className="button" onClick={this.toPage.bind(this)}>My Business</a>
				</p> 
				<p className="buttons-row">
				  <a href="#" className="button" onClick={this.logout.bind(this)}>Logout</a>
				</p>   
				<div className="list-block-label">Veer Copyright 2017</div>
			</div>
        );
    }
}

export default NavBody;
