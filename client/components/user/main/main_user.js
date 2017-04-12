import React, {Component} from 'react';
import UserMap from './user_map';
import Footer from './footer';
import UserList from './user_list';
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
		if(this.state.mapOn){
			return(
				<UserMap profile={this.props.profile} pages={this.props.pages} deals={this.props.deals} pageID={this.props.params.pageID}/>
			)
		}
		else{
			return(
				<UserList profile={this.props.profile} pages={this.props.pages} deals={this.props.deals}/>
			)
		}
	}
	showList(){
		this.setState({mapOn: false});
	}
	showMap(){
		this.setState({mapOn: true});
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
					<Footer showList={this.showList.bind(this)} showMap={this.showMap.bind(this)} />	
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





