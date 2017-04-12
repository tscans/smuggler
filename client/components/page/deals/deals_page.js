import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
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
        return (
        	<div>
        		<div className="my-push-down-10 my-card-container">
        			<DealList deals={this.props.deals} deleting={this.state.deleteRed}/>
        		</div>
                <div className="speed-dial">
                <a href="#" className="floating-button">
                  <i className="icon icon-plus"></i>
                  <i className="icon icon-close"></i>
                </a>
                <div className="speed-dial-buttons">
                  <a href="#" style={this.state.deleteStyle} onClick={this.handleDelete.bind(this)}>
                    <i className="fa fa-minus-circle" aria-hidden="true"></i>
                  </a>
                  <a href="#" onClick={this.openCreate.bind(this)}>
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
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







