import React from 'react';

class PageReviews extends React.Component{
	popMessage(){
		var myApp = new Framework7();

		myApp.popup('.popup-services');
	}
	sendMessage(p){
		//pageid, message are params
		var myApp = new Framework7();
		var data = {};
		data.pageID = p._id;
		data.message = this.refs.message.value.trim();
		Meteor.call("message.makeMessage", data, (error,data)=>{
			if(error){
				console.log(error);
				myApp.alert(error.message, `Warning!`);
			}
			else{
				console.log(data);
				this.refs.message.value = "";
                
		        myApp.closeModal(".popup-services");
			}
		})
	}
	closeReview(){
		var myApp = new Framework7();
		console.log('try')
 		myApp.closeModal(".popup-services");
	}
	messagePop(p){
		return(
			<div className="popup popup-services">
				<div className="navbar theme-green my-card-3">
                    <div className="navbar-inner">
                        <div className="right my-left-5">
                        	<a href="#" onClick={this.closeReview.bind(this)}>
                        		<i className="fa fa-times color-white"></i>
                        	</a>
                        </div>
                        <div className="right">
                    		Message: {p.pageName}
                    	</div>
                    </div>
                </div>
			    <div className="content-block">
			      <p>Send a message to {p.pageName}. After reviewing it, {p.pageName} may choose to post it to their page under reviews.</p>
			      <div className="list-block">
				      <ul>
				      <li className="item-content">
	                        <div className="item-inner">
	                          <div className="item-title label">Message</div>
	                          <div className="item-input">
	                              <textarea ref="message" placeholder="Drop a note"></textarea>
	                          </div>
	                        </div>
	                      </li>
	                  </ul>
                  </div>
                  <p className="buttons-row my-crunch-btn">
					  <a href="#" className="button button-fill color-blue" onClick={()=>{this.sendMessage(p)}}>Submit</a>
				  </p>
			    </div>
			</div>
		)
	}
	renderReviews(){
		if(!this.props.page.selectedMessages){
			return(<div></div>)
		}
		if(this.props.page.selectedMessages.length == 0){
			return<div>This page has no reviews</div>
		}
		return this.props.page.selectedMessages.map(m=>{
			return(
				<div key={m._id}>
					<div className="card">
					    <div className="card-content">
					        <div className="card-content-inner">
					        	<div className="color-gray">
					        		{m.name} - {m.createdAt}
					        	</div>
					        	"{m.message}"
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
				<p className="buttons-row my-crunch-btn">
				  <a onClick={()=>{this.popMessage(this.props.page)}} href="#" className="button button-fill button-raised color-green">Drop a Note</a>
				</p>
				{this.messagePop(this.props.page)}
				{this.renderReviews()}
			</div>
		)
	}
}

export default PageReviews;