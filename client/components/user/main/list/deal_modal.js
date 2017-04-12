import React from 'react';

class DealModal extends React.Component{
	close(){
        var myApp = new Framework7();
        myApp.closeModal();
    }
	render(){
		if(!this.props.deal){
			return(
				<div>
					<div className="popup popup-about">
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
		var d = this.props.deal;
		var ics = {
			fontSize: "80vw"
		}
		return(
			<div>
				<div className="popup popup-about">
					<div className="navbar theme-green my-card-3">
	                    <div className="navbar-inner">
	                        <div className="right my-left-5"><i onClick={this.close.bind(this)} className="fa fa-times"></i></div>
	                    </div>
	                </div>
				    <div className="content-block">
				    	<h1>{d.title}</h1>
				    	<i style={ics} className={"fa"+d.randomicon+" ic-"+d.randomcolor}></i>
				    	<h2>{d.date}</h2>
				    	<p>{d.details}</p>
				    </div>
				</div>
			</div>
		)
	}
}

export default DealModal;



