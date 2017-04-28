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
import DealModal from './list/deal_modal';
import SubNav from './external/sub_nav';


class MainUser extends Component {
	toMap(){
		browserHistory.push("/user/map/");
		this.forceUpdate();
	}
	currentView(){
		return(
			<div className="my-card-container">
				<div className="my-push-down-10">

					<h3 className="color-blue">Liked Specials</h3>
					<BookUser deals={this.props.bookDeals} profile={this.props.profile}/>
					<hr/>
					<div className="my-container-bottom">
						<DealsList deals={this.props.deals} profile={this.props.profile}/>
					</div>
				</div>
			</div>
		)
	}
    render() {
		if(!this.props.profile || !this.props.pages || !this.props.deals){
			return<div></div>
		}
        return (
        	<div>
        		<SubNav />
        		<DealModal deals={this.props.deals.concat(this.props.bookDeals)} did={this.props.params.dealID}/>
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
    Meteor.subscribe("bookDeals");

    return {profile: Profile.findOne({}), pages: Page.find({}).fetch(),
     deals: Deal.find({upvotes: {$not:Meteor.userId()}}).fetch(),
     bookDeals:Deal.find({upvotes:Meteor.userId() }).fetch(),
 	}

	
}, MainUser);  





