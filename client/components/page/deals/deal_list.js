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
				<div className="my-card-margin-bottom" key={d._id}>
					<div> 
						<div className="go-fucking-center">
							<div className="card">
							    <div className="card-content">
						            <div className="row">
									    <div className="col-30">
									    	<img src={d.picture} style={divStyle}/>
									    </div>
									    <div className="col-50">
									    	<div className="card-content-inner" style={info}>
									    	  {d.title}
									    	  <div className="color-gray my-small-gray">{d.pageName}</div>
									    	  <div className="color-gray my-small-gray">{d.date}</div>
										    </div>
									    </div>
									    <div className="col-20 my-clickable" style={test}>
											<a href="#" style={upStyle}>{d.upvotes.length.toString()} <i className="fa fa-thumbs-o-up"></i></a>
									    </div>
									</div>
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