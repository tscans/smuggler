import React, {Component} from 'react';
import UserMap from './user_map';
import Footer from './footer';
import UserList from './user_list';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';


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
				<UserMap />
			)
		}
		else{
			return(
				<UserList />
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

    return {profile: Profile.findOne({})}

	
}, MainUser);  
