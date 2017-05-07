import React from 'react';
import JobModal from './job_modal';
import {browserHistory} from 'react-router';

class JobsList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			jid: null
		}
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
					<h2>No Jobs Posted.</h2>
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
					</div>
				</div>
			)
		})
	}
	toList(){
		browserHistory.push("/user/j/")
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
				<a href="#" className="floating-button color-green" onClick={this.toList.bind(this)}>
		            <i className="fa fa-map" aria-hidden="true"></i>
		        </a>
			</div>
		)
	}
}

export default JobsList;  