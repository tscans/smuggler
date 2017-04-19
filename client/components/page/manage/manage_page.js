import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
import {Survey} from '../../../../imports/collections/survey';

class ManagePage extends Component {
	listSurveys(){
		if(this.props.surveys.length == 0){
			return(
				<div>
					No Surveys at This Time
				</div>
			)
		}
		return this.props.surveys.map(s=>{
			return(
				<div key={s._id}>
					<p className="buttons-row my-crunch-btn">
					  <a href="#" className="button button-raised color-green" onClick={()=>{browserHistory.push("/page/manage/data/"+s._id+"/")}}>{s.surveyName}</a>
					</p>
					Responses - {s.userResponders.length}
				</div>
			)
		})
	}
    render() {
    	if(!this.props.surveys){
    		return<div></div>
    	}
        return (
        	<div>
        		<h1>Manage Survey Data</h1>
        		{this.listSurveys()}
        	</div>
        );
    }
}

export default createContainer((props)=>{
    Meteor.subscribe("ownSurveys");

    return {surveys: Survey.find({}).fetch()}

	
}, ManagePage);
