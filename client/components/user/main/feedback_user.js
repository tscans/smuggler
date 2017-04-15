import React from 'react';
import {browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';
import {Page} from '../../../../imports/collections/page';

class FeedbackUser extends React.Component{
	fup(pid){
		browserHistory.push("/user/feedback/"+pid+"/")
	}
	renderPageList(){
		var jjj = this.props.pages;

		jjj.sort(function(a, b) {
		    return parseFloat(a.favorites) - parseFloat(b.favorites);
		});
		return jjj.reverse().map(p=>{
			return(
				<div className="go-fucking-center" key={p._id}>
					<div className="card" onClick={()=>{this.fup(p._id)}}>
					  <div className="card-content">
					    <div className="card-content-inner">
					    	<div>
					    		<h2>{p.pageName}</h2>
					    	</div>
					    </div>
					  </div>
					</div>
				</div>
			)
		})
	}
	render(){
		if(!this.props.pages){
			return<div></div>
		}
		return(
			<div>
				{this.renderPageList()}
			</div>
		)
	}
}

export default createContainer((props)=>{
    Meteor.subscribe("localPages")
    Meteor.subscribe('profile');

    return {profile: Profile.findOne({}), pages: Page.find({}).fetch()}

	
}, FeedbackUser);  