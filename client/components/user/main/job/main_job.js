import React from 'react';
import JobsList from './jobs_list';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../../imports/collections/profile';
import {Page} from '../../../../../imports/collections/page';
import {Job} from '../../../../../imports/collections/job';

class MainJob extends React.Component{
	render(){
		return(
			<div>
				<JobsList profile={this.props.profile} pages={this.props.pages} jobs={this.props.jobs}/>
			</div>
		)
	}
}

export default createContainer((props)=>{
    Meteor.subscribe("profile");
    Meteor.subscribe('localPages');
    Meteor.subscribe("localJobs");

    return {
     profile: Profile.findOne({}), 
     pages: Page.find({}).fetch(),
     jobs: Job.find({}).fetch()
 	}

	
}, MainJob);