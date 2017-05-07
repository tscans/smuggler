import React from 'react';
import JobModal from './job_modal';

class JobsList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			jid: null
		}
	}
	renderDelete(j){
		if(this.props.deleting){
			return(
				<div className="my-delete-button go-fucking-center" onClick={()=>{this.handleDelete(j)}}>
					<b><h3 className="ic-red"><a href="#" className="button button-fill color-red">Delete</a></h3></b>
				</div>
			)
		}
	}
	handleDelete(j){
		Meteor.call("job.deleteJob", j._id, (error, data)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log('success');
			}
		})
	}
	openModal(jid){
		this.setState({jid: jid});
		var myApp = new Framework7();
		myApp.popup('.popup-services');
	}
	renderCards(){
		console.log(this.props.jobs)
		if(this.props.jobs.length == 0){
			return(
				<div>
					<h2>You have no jobs posted.</h2>
				</div>
			)
		}
        return this.props.jobs.map(j=>{
        	var divStyle = {
	            height: "10vh",
	            padding: "0px",
	            margin: "0px"
	        }
	    	var info = {
	    		textAlign: "left",
	    		padding: "0px",
	    		paddingTop: "1px"
	    	}
	    	var test = {
	    		height: "10vh",
	    		paddingTop: "3vh"
	    	}
			var upStyle = {
				color: "#2196F3",
				fontSize: "3vh"
			}
			var test = {
        		height: "10vh",
        		paddingTop: "3vh"
        	}
			
			return(
				<div className="my-card-margin-bottom" key={j._id}>
					<div> 
						<div className="go-fucking-center">
							<div className="card">
							    <div className="card-content">
						            <div className="row">
									    <div className="col-30">
									    	<img src={j.picture} style={divStyle}/>
									    </div>
									    <div className="col-70">
									    	<div className="card-content-inner" style={info} onClick={()=>{this.openModal(j._id)}}>
									    	  {j.title}
									    	  <div className="color-gray my-small-gray">{j.pageName}</div>
									    	  <div className="color-gray my-small-gray">{j.datePosted}</div>
										    </div>
									    </div>
									</div>
							    </div>
							</div> 
						</div>
						{this.renderDelete(j)}
					</div>
				</div>
			)
		})
	}
	render(){
		if(!this.props.jobs){
			return(
				<div>
					<img src="/ring.gif" />
				</div>
			)
		}
		return(
			<div>
				<JobModal jobs={this.props.jobs} jid={this.state.jid} />
				{this.renderCards()}
			</div>
		)
	}
}

export default JobsList;