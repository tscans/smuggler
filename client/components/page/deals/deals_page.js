import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';
import {Page} from '../../../../imports/collections/page';
import DealCreate from './deal_create';

class DealsPage extends Component {
	openCreate(){
		var myApp = new Framework7();
		myApp.loginScreen();
	}
    render() {
        return (
        	<div>
        		<h3>You have no deals.</h3>
        		<a href="#" className="floating-button color-blue" onClick={this.openCreate.bind(this)}>
				    <i className="icon icon-plus"></i>
				</a>
				<div className="login-screen">
				    <DealCreate />
				</div>
        	</div>
        );
    }
}

export default createContainer((props)=>{
    Meteor.subscribe("profile");
    Meteor.subscribe("ownPage");

    return {profile: Profile.findOne({}), page: Page.findOne({})}

    
}, DealsPage); 