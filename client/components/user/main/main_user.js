import React, {Component} from 'react';
import UserMap from './user_map';
import Footer from './footer';
import PagesList from './list/pages_list';
import DealsList from './list/deals_list';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';
import {Page} from '../../../../imports/collections/page';
import {Deal} from '../../../../imports/collections/deal';


class MainUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapOn: true
		}
	}
	currentView(){
		if(this.state.mapOn == 1){
			return(
				<UserMap profile={this.props.profile} pages={this.props.pages} deals={this.props.deals} pageID={this.props.params.pageID}/>
			)
		}
		if(this.state.mapOn == 2){
			return(
				<div className="my-card-container">
					<div style={{backgroundColor: "gold"}}>Local Pages</div>
					<div className="my-push-down-10">
						<PagesList profile={this.props.profile} pages={this.props.pages} deals={this.props.deals}/>
					</div>
				</div>
			)
		}
		if(this.state.mapOn == 3){
			return(
				<div className="my-card-container">
					<div style={{backgroundColor: "gold"}}>Local Deals</div>
					<div className="my-push-down-10">
						<DealsList profile={this.props.profile} pages={this.props.pages} deals={this.props.deals}/>
					</div>
				</div>
			)
		}
	}
	showList(){
		this.setState({mapOn: 2});
	}
	showMap(){
		this.setState({mapOn: 1});
	}
	showTop(){
		this.setState({mapOn: 3});
	}
    render() {
    	console.log(this.props)
		if(!this.props.profile || !this.props.pages || !this.props.deals){
			return<div></div>
		}
        return (
        	<div>
        		{this.currentView()}
        		<div className="my-footer">
					<Footer showList={this.showList.bind(this)} showMap={this.showMap.bind(this)} showTop={this.showTop.bind(this)}/>	
				</div>
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





