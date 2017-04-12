import React from 'react';

class PageInfo extends React.Component{
	ifWeb(){
		if(this.props.page.website != "" || !this.props.page.website){
			return<div></div>
		}
		else{
			return(
				<div>
					<div className="row">
				        <div className="col-50">Website</div>
				        <div className="col-50">{this.props.page.website}</div>
				    </div>
				</div>
			)
		}
	}
	render(){
		return(
			<div>
			<br/>
				<div className="row">
			        <div className="col-50">Address</div>
			        <div className="col-50">{this.props.page.address}</div>
			    </div>
			    <br/>
			    <div className="row">
			        <div className="col-50">Email</div>
			        <div className="col-50">{this.props.page.email}</div>
			    </div>
			    <br/>
			    <div className="row">
			        <div className="col-50">Phone</div>
			        <div className="col-50">{this.props.page.phone}</div>
			    </div>
			    <br/>
			    {this.ifWeb()}
			    <br/>
			    <div className="row">
			        <div className="col-50">About</div>
			        <div className="col-50">{this.props.page.about}</div>
			    </div>
			</div>
		)
	}
}

export default PageInfo;