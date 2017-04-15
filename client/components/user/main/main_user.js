import React, {Component} from 'react';
import UserMap from './user_map';
import PagesList from './list/pages_list';
import DealsList from './list/deals_list';
import {browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';
import {Page} from '../../../../imports/collections/page';
import {Deal} from '../../../../imports/collections/deal';
import BookUser from './book_user';


class MainUser extends Component {
	toMap(){
		browserHistory.push("/user/map/");
		this.forceUpdate();
	}
	currentView(){
		return(
			<div className="my-card-container">
				<div className="my-push-down-10">
					<BookUser />
					<h3>Local Specials</h3>
					<div className="my-container-bottom">
						<DealsList profile={this.props.profile} pages={this.props.pages} deals={this.props.deals}/>
					</div>
				</div>
			</div>
		)
	}
    render() {
    	console.log(this.props)
		if(!this.props.profile || !this.props.pages || !this.props.deals){
			return<div></div>
		}
        return (
        	<div>
        		{this.currentView()}
        		<a href="#" className="floating-button color-green" onClick={this.toMap.bind(this)}>
		            <i className="fa fa-map" aria-hidden="true"></i>
		        </a>
        	</div>
        );
    }
}

export default createContainer((props)=>{
    Meteor.subscribe("profile");
    Meteor.subscribe('localPages');
    Meteor.subscribe("localDeals");

    return {profile: Profile.findOne({}), pages: Page.find({}).fetch(), deals: Deal.find({}).fetch()}

	
}, MainUser);  





