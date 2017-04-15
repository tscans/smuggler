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
		browserHistory.push("/page/");
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
				<div className="list-block">
				  <ul>
				  	<li onClick={this.toMap.bind(this)}>
				      <a href="#" className="item-link item-content">
				        <div className="item-inner">
				          <div className="item-after">Specials</div>
				        </div>
				        <div className="item-media"><i className="icon icon-f7"></i></div>
				      </a>
				    </li>
				    <li onClick={this.toFeedback.bind(this)}>
				      <a href="#" className="item-link item-content">
				        <div className="item-inner">
				          <div className="item-after">Business Feedback</div>
				        </div>
				        <div className="item-media"><i className="icon icon-chevron_right"></i></div>
				      </a>
				    </li>
				    <li>
				      <a href="#" className="item-link item-content">
				        <div className="item-inner my-clickable">
				          <div onClick={this.logout.bind(this)} className="item-after my-red-font">Logout</div>
				        </div>
				        <div className="item-media"><i className="icon icon-chevron_right"></i></div>
				      </a>
				    </li>
				  </ul>
				  <div className="list-block-label">Veer Copyright 2017</div>
				  <div className="list-block-label"><a href="#" onClick={this.toPage.bind(this)}>To Page</a></div>
				</div>
			</div>
        );
    }
}

export default NavBody;
