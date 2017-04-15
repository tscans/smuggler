import React from 'react';

class ManageFeedback extends React.Component{
	removeReview(mid){
		console.log('runn',mid)
		Meteor.call("page.selectedMessageRemove", mid, (error,data)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log(data);
			}
		})
	}
	renderReviews(){
		var upbit = {
			marginTop: "-4vh"
		}
		if(this.props.page.selectedMessages.length == 0){
			return<div>You have no published reviews</div>
		}
		return this.props.page.selectedMessages.map(m=>{
			return(
				<div key={m._id}>
					<div className="card">
					    	<p className="buttons-row">
							  <a href="#" className="button button-fill color-red" onClick={()=>{this.removeReview(m._id)}}>Remove Review</a>
							</p>
					    <div className="card-content">
					        <div className="card-content-inner">
					        	<div className="color-gray" style={upbit}>
					        		{m.name} - {m.createdAt}
					        	</div>
					        	{m.message}
					        </div>
					    </div>
					</div> 
				</div>
			)
		})
	}
	render(){
		return(
			<div>
				<div className="navbar theme-green my-card-3">
                    <div className="navbar-inner">
                        <div className="right my-left-5">
                        	<a href="#" className="close-popup">
                        		<i className="fa fa-times color-white"></i>
                        	</a>
                        </div>
                        Manage Reviews
                    </div>
                </div>
                <div className="content-block">
					{this.renderReviews()}
				</div>
			</div>
		)
	}
}

export default ManageFeedback;