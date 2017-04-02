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
    render() {
        return (
        	<div>
				<div className="list-block">
				  <ul>
				    <li>
				      <a href="#" className="item-link item-content">
				        <div className="item-inner">
				          <div className="item-after">My McBook</div>
				        </div>
				        <div className="item-media"><i className="icon icon-f7"></i></div>
				      </a>
				    </li>
				    <li>
				      <a href="#" className="item-link item-content">
				        <div className="item-inner">
				          <div className="item-after">Give Feedback</div>
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
				  <div className="list-block-label">McDeal Copyright 2017</div>
				</div>
			</div>
        );
    }
}

export default NavBody;
