import React from 'react';

class DealModal extends React.Component{
	close(){
        var myApp = new Framework7();
        myApp.closeModal(".popup-services");
    }
	render(){
		if(!this.props.deals || !this.props.did){
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
		var all = this.props.deals;
		var did = this.props.did;
		var d = null;
		for(var i = 0; i< all.length;i++){
			if(all[i]._id == did){
				d = all[i];
			}
		}
		if(!d){
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
			backgroundImage: 'url(' + d.picture + ')',
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
							  <div style={bk} className="card-header color-white no-border">
							  	<div style={bn}>{d.upvotes.length.toString()} <i className="fa fa-thumbs-o-up" aria-hidden="true"></i></div>
							  </div>
							  	<div className="content-block">
							    	<h1>{d.title}</h1>
							    	<h2>{d.pageName}</h2>
							    	<h2>{d.date}</h2>
							    	<p>{d.details}</p>
							    </div>
							</div>
				        </div>
			        </div>
				    
				</div>
			</div>
		)
	}
}

export default DealModal;



