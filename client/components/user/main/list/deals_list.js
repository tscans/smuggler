import React from 'react';

class DealsList extends React.Component{
	renderTop(d,divStyle){
		if(d.picture == ""){
	        return(
	        	<div style={{backgroundColor: "#E3F2FD",marginBottom: "-4vh"}}>
					<h3>{d.title} - <span className="color-gray my-small-font">{d.pageName}</span></h3>
	        	</div>
	        )
    	}
    	else{
    		return(
    			<div style={divStyle} className="card-header color-white no-border">
    				<div className="my-white-on-black my-title-buffer">
    					<span className="color-gray my-small-font">{d.pageName}</span>
    					<br/>
    					{d.title}
    				</div>
    			</div>
    		)
    	}
	}
	upvote(did){
		Meteor.call("deal.upvoteDeal", did, (error,data)=>{
			if(error){
				console.log(error)
			}
			else{
				console.log(data)
			}
		})
	}
	book(did){
		Meteor.call("profile.book", did, (error,data)=>{
			if(error){
				console.log(error)
			}
			else{
				console.log(data)
			}
		})
	}
	renderCards(){
		if(this.props.deals.length == 0){
			return(
				<div>
					<h2>No Deals.</h2>
				</div>
			)
		}
        return this.props.deals.map(d=>{
        	if(d.picture == ""){
        		var divStyle = {
		            height: "0vh"
		        }
        	}
        	else{
        		var divStyle = {
		            backgroundImage: 'url(' + d.picture + ')',
		            height: "20vh"
		        }
        	}
        	var upStyle = {
        		color: "gray"
        	}
        	var bookStyle = {
        		color: "gray"
        	}
			if(this.props.profile.book.includes(d._id)){
				bookStyle = {}
			}
			if(d.upvotes.includes(Meteor.userId())){
				upStyle = {
					color: "green"
				}
			}
			return(
				<div className="my-card-margin-bottom" key={d._id}>
					<div> 
						<div className="go-fucking-center">
							<div className="card demo-card-header-pic">
							  {this.renderTop(d, divStyle)}
							  <div className="card-content">
							    <div className="card-content-inner">
							      <p className="color-gray">{d.date}</p>
							      <p>{d.details}</p>
							    </div>
							  </div>
							  <div className="card-footer">
							    <a href="#" style={upStyle} className="my-button-half link" onClick={()=>{this.upvote(d._id)}}>Upvotes {d.upvotes.length.toString()} <i className="fa fa-arrow-up"></i></a>
							    <a href="#" style={bookStyle} className="my-button-half link" onClick={()=>{this.book(d._id)}}>Bookmark <i className="fa fa-bookmark"></i></a>
							  </div>
							</div>
						</div>
					</div>
				</div>
			)
		})
	}
	render(){
		if(!this.props.deals){
			return(
				<div>
					<img src="/ring.gif" />
				</div>
			)
		}
		return(
			<div>
				<div className="my-container-bottom">
					{this.renderCards()}
				</div>
			</div>
		)
	}
}

export default DealsList;




