import React from 'react';

class FeedbackMessages extends React.Component{
	renderMessages(){
		var upbit = {
			marginTop: "-4vh"
		}
		if(this.props.messages.length == 0){
			return<div>You have no messages</div>
		}
		return this.props.messages.map(m=>{
			return(
				<div key={m._id}>
					<div className="card">
					    	<p className="buttons-row">
							  <a href="#" className="button button-fill color-red" onClick={()=>{this.deleteMessage(m._id)}}>Delete</a>
							  <a href="#" className="button button-fill color-green" onClick={()=>{this.addReview(m._id)}}>Post Review</a>
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
		});
	}
	addReview(mid){
		var myApp = new Framework7();
		Meteor.call("page.selectedMessageAdd", mid, (error,data)=>{
			if(error){
				console.log(error);
				myApp.alert(error.message, 'Warning!');
			}
			else{
				console.log(data);
			}
		})
	}
	deleteMessage(mid){
		Meteor.call("message.deleteMessage", mid, (error,data)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log(data);
			}
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
                        View Messages
                    </div>
                </div>
                <div className="content-block">
					{this.renderMessages()}
				</div>
			</div>
		)
	}
}

export default FeedbackMessages;