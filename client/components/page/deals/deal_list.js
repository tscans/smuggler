import React from 'react';

class DealList extends React.Component{
	renderDelete(d){
		if(this.props.deleting){
			return(
				<div className="my-delete-button go-fucking-center" onClick={()=>{this.handleDelete(d)}}>
					<b><h3 className="ic-red"><a href="#" className="button button-fill color-red">Delete</a></h3></b>
				</div>
			)
		}
	}
	handleDelete(d){
		Meteor.call("deal.deleteDeal", d._id, (error, data)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log('success');
			}
		})
	}
	renderTop(d,divStyle){
		if(d.picture == ""){
	        return(
	        	<div>
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
	renderCards(){
		if(this.props.deals.length == 0){
			return(
				<div>
					<h2>You have no deals.</h2>
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
							    <a href="#" className="link ic-green">Upvotes {d.upvotes.length.toString()} <i className="fa fa-arrow-up"></i></a>
							    <a href="#" className="link">Bookmark <i className="fa fa-bookmark"></i></a>
							  </div>
							</div>
						</div>
						{this.renderDelete(d)}
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
				{this.renderCards()}
			</div>
		)
	}
}

export default DealList;