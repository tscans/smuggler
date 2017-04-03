import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';
import {Page} from '../../../../imports/collections/page';

class NavBody extends Component {
	sendUser(){
		var myApp = new Framework7();
 
	    var $$ = Dom7;
	    myApp.closePanel();
	    browserHistory.push("/user/");
	}
	toDeals(){
		browserHistory.push("/page/deals/")
	}
	toFeedback(){
		browserHistory.push("/page/feedback/")
	}
	toManage(){
		browserHistory.push("/page/manage/")
	}
    render() {
    	if(!this.props.profile){
    		return(<div></div>)
    	}
    	if(!this.props.profile.page){
    		return(
    			<div>
    				<ul>
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
    			</div>
    		)
    	}
        return (
        	<div>
				<div className="list-block">
				  <ul>
				    <li>
				      <a href="#" className="item-link item-content" onClick={this.toDeals.bind(this)}>
				        <div className="item-inner">
				          <div className="item-after">Deals</div>
				        </div>
				        <div className="item-media"><i className="icon icon-chevron_right"></i></div>
				      </a>
				    </li>
				    <li>
				      <a href="#" className="item-link item-content" onClick={this.toFeedback.bind(this)}>
				        <div className="item-inner">
				          <div className="item-after">Feedback</div>
				        </div>
				        <div className="item-media"><i className="icon icon-chevron_right"></i></div>
				      </a>
				    </li>
				    <li>
				      <a href="#" className="item-link item-content" onClick={this.toManage.bind(this)}>
				        <div className="item-inner">
				          <div className="item-after">Manage</div>
				        </div>
				        <div className="item-media"><i className="icon icon-chevron_right"></i></div>
				      </a>
				    </li>
				    <li>
				      <a href="#" className="item-link item-content">
				        <div className="item-inner">
				          <div className="item-after">Update Info</div>
				        </div>
				        <div className="item-media"><i className="icon icon-f7"></i></div>
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
				</div>
			</div>
        );
    }
}

export default createContainer((props)=>{
    Meteor.subscribe("profile");
    Meteor.subscribe("ownPage");

    return {profile: Profile.findOne({}), page: Page.findOne({})}

    
}, NavBody);
