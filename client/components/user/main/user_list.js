import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';
import {Page} from '../../../../imports/collections/page';
import {Deal} from '../../../../imports/collections/deal';
import DealsList from './list/deals_list';
import PagesList from './list/pages_list';

class UserList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dealsList: true
		}
	}
	renderListView(){
		if(this.state.dealsList){
			return(
				<div className="my-push-down-10 my-card-container">
					<DealsList deals={this.props.deals}/>
				</div>
			)
		}
		else{
			return(
				<div className="my-push-down-10 my-card-container">
					<PagesList pages={this.props.pages}/>
				</div>
			)
		}
	}
	changeListView(){
		this.setState({dealsList: !this.state.dealsList});
	}
    render() {
        return (
        	<div>
				{this.renderListView()}
				<a href="#" className="floating-button color-yellow my-float-up" onClick={this.changeListView.bind(this)}>
				    <i className="fa fa-list-alt" aria-hidden="true"></i>
				</a>
			</div>
        );
    }
}

export default createContainer((props)=>{
    Meteor.subscribe("profile");
    Meteor.subscribe("localPages");
    Meteor.subscribe("localDeals");

    return {profile: Profile.findOne({}), pages: Page.find({}).fetch(), deals: Deal.find({}).fetch()}

    
}, UserList); 








