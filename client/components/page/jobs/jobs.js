import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';
import {Job} from '../../../../imports/collections/job';
import JobsList from './jobs_list';
import JobCreate from './job_create';

class Jobs extends React.Component{
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
	render(){
		return(
			<div>
				<div className="my-push-down-10 my-card-container">
        			<JobsList jobs={this.props.jobs} deleting={this.state.deleteRed}/>
        		</div>
				<a href="#" className="floating-button color-red my-single-float" style={this.state.deleteStyle} onClick={this.handleDelete.bind(this)}>
                    <i className="fa fa-minus-circle"></i>
                </a>
                <a href="#" className="floating-button color-blue my-double-float" onClick={this.openCreate.bind(this)}>
                    <i className="fa fa-plus-circle"></i>
                </a>
                <div className="login-screen">
				    <JobCreate />
				</div>
			</div>
		)
	}
}

export default createContainer((props)=>{
    Meteor.subscribe("profile");
    Meteor.subscribe("ownJobs");

    return {profile: Profile.findOne({}), jobs: Job.find({}).fetch()}

    
}, Jobs);