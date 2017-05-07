import React from 'react';

class JobModal extends React.Component{
	close(){
        var myApp = new Framework7();
        myApp.closeModal(".popup-services");
    }
	render(){
		if(!this.props.jobs || !this.props.jid){
			return(
				<div>
					<div className="popup popup-services">
						<div className="navbar theme-green my-card-3">
		                    <div className="navbar-inner">
		                        <div className="right my-left-5"><i onClick={this.close.bind(this)} className="fa fa-times"></i></div>
		                    </div>
		                </div>
					    <div className="content-block">
			                <p>Loading...</p>
					    </div>
					</div>
				</div>
			)
		}
		var all = this.props.jobs;
		var jid = this.props.jid;
		var j = null;
		for(var i = 0; i< all.length;i++){
			if(all[i]._id == jid){
				j = all[i];
			}
		}
		if(!j){
			return(
				<div>
					<div className="popup popup-services">
						<div className="navbar theme-green my-card-3">
		                    <div className="navbar-inner">
		                        <div className="right my-left-5"><i onClick={this.close.bind(this)} className="fa fa-times"></i></div>
		                    </div>
		                </div>
					    <div className="content-block">
			                <p>Loading...</p>
					    </div>
					</div>
				</div>
			)
		}
		var bk = {
			backgroundImage: 'url(' + j.picture + ')',
		    height: "35vh"
		}
		var bn = {
			color: "#9999ff",
			padding: "3px",
			marginTop: "30vh",
			marginLeft: "3vw",
			backgroundSize: "cover",
    		backgroundPosition: "center",
    		fontSize: "25px",
    		backgroundColor: "white"
		}
		return(
			<div>
				<div className="popup popup-services">
					<div className="navbar theme-green my-card-3">
	                    <div className="navbar-inner">
	                        <div className="right my-left-5"><i onClick={this.close.bind(this)} className="fa fa-times"></i></div>
	                    </div>
	                </div>
	                <div className="my-card-container">
			        <div className="content-block my-page-box">
						<div className="card demo-card-header-pic">
							  	<div className="content-block">
							    	<h1>{j.title}</h1>
							    	<h2>{j.pageName}</h2>
							    	<p>Job Posted: {j.datePosted}</p>
							    	<p>Address: {j.address}</p>
							    	<p><b>Description</b></p>
							    	<p>{j.description}</p>
							    	<br/>
							    	<p><b>Requirements</b></p>
							    	<p>{j.requirements}</p>
							    	<br/>
							    	<p><b>Benefits</b></p>
							    	<p>{j.benefits}</p>
							    	<br/>
							    	<p><b>Contact Info</b></p>
							    	<p>{j.contactEmail}</p>
							    	<p>{j.contactPhone}</p>
							    	<br/>
							    </div>
							</div>
				        </div>
			        </div>
				    
				</div>
			</div>
		)
	}
}

export default JobModal;



