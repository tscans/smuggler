import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class NavBody extends Component {
	sendUser(){
		var myApp = new Framework7();
 
	    var $$ = Dom7;
	    myApp.closePanel();
	    browserHistory.push("/user/");
	}
    render() {
        return (
        	<div>
				<div className="list-block">
				  <ul>
				    <li>
				      <a href="#" className="item-link item-content">
				        <div className="item-inner">
				          <div className="item-after">Info</div>
				        </div>
				        <div className="item-media"><i className="icon icon-f7"></i></div>
				      </a>
				    </li>
				    <li>
				      <a href="#" className="item-link item-content">
				        <div className="item-inner">
				          <div className="item-after">Deals</div>
				        </div>
				        <div className="item-media"><i className="icon icon-chevron_right"></i></div>
				      </a>
				    </li>
				    <li>
				      <a href="#" className="item-link item-content">
				        <div className="item-inner">
				          <div className="item-after">Feedback</div>
				        </div>
				        <div className="item-media"><i className="icon icon-chevron_right"></i></div>
				      </a>
				    </li>
				    <li>
				      <a href="#" className="item-link item-content">
				        <div className="item-inner">
				          <div className="item-after">Manage</div>
				        </div>
				        <div className="item-media"><i className="icon icon-chevron_right"></i></div>
				      </a>
				    </li>
				    <li>
				      <a href="#" className="item-link item-content">
				        <div className="item-inner">
				          <div className="item-after my-red-font">Logout</div>
				        </div>
				        <div className="item-media"><i className="icon icon-chevron_right"></i></div>
				      </a>
				    </li>
				  </ul>
				  <div className="list-block-label">McDeal Copyright 2017</div>
				  <a href="#" onClick={this.sendUser.bind(this)}>To User</a>
				</div>
			</div>
        );
    }
}

export default NavBody;
