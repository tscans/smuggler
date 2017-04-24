import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
import {Profile} from '../../../../imports/collections/profile';
import {Page} from '../../../../imports/collections/page';
import {Deal} from '../../../../imports/collections/deal';
import DealCreate from './deal_create';
import DealList from './deal_list';

class DealsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteRed: false,
            deleteStyle: {}
        }
    }
	openCreate(){
		var myApp = new Framework7();
		myApp.loginScreen();
	}
    handleDelete(){
        if(this.state.deleteRed){
            this.setState({deleteRed: !this.state.deleteRed, deleteStyle: {}});
        }
        else{
            this.setState({deleteRed: !this.state.deleteRed, deleteStyle: {backgroundColor: 'red'}})
        }
    }
    render() {
    	if(!this.props.profile){
    		return<div></div>
    	}
        if(!this.props.profile.page){
            browserHistory.push("/page/")
        }
        return (
        	<div>
        		<div className="my-push-down-10 my-card-container">
        			<DealList deals={this.props.deals} deleting={this.state.deleteRed}/>
        		</div>
                <a href="#" className="floating-button color-red my-single-float" style={this.state.deleteStyle} onClick={this.handleDelete.bind(this)}>
                    <i className="fa fa-minus-circle"></i>
                </a>
                <a href="#" className="floating-button color-blue my-double-float" onClick={this.openCreate.bind(this)}>
                    <i className="fa fa-plus-circle"></i>
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
    Meteor.subscribe("ownDeals");

    return {profile: Profile.findOne({}), page: Page.findOne({}), deals: Deal.find({metID: Meteor.userId()}).fetch()}

    
}, DealsPage); 







