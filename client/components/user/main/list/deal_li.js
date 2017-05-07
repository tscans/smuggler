import React from 'react';
import {browserHistory} from 'react-router';

class DealLi extends React.Component{
	book(did){
		Meteor.call("profile.book", did, (error,data)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log(data);
			}
		})
	}
	openModal(did){
		var w = window.location.pathname;
		if(w.includes('/user/b/') || w.includes("/user/d/") || w.includes("/user/blist/")){
			this.props.getDeal(did);
			var myApp = new Framework7();
			myApp.popup('.popup-services');
			return;
		}
		else{
			browserHistory.push("/user/dlist/"+did+"/");
			var myApp = new Framework7();
			myApp.popup('.popup-services');
		}
	}
	render(){
		if(!this.props.deal){
			return<div></div>
		}
		var d = this.props.deal;
		var divStyle = {
            height: "10vh",
            padding: "0px",
            margin: "0px"
        }
    	
    	var upStyle = {
    		color: "gray",
			fontSize: "3vh"
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
		if(d.upvotes.includes(Meteor.userId())){
			upStyle = {
				color: "#2196F3",
				fontSize: "3vh"
			}
			test = {
        		height: "10vh",
        		paddingTop: "3vh"
        	}
		}
		var color = {};
		if(this.props.red){
			color = {
				background: `repeating-linear-gradient(
				  -55deg,
				  #FFEBEE,
				  #FFEBEE 10px,
				  #F44336 10px,
				  #F44336 20px
				)`
			}
		}
		return(
			<div>
				<div key={d._id}>
					<div className="card" style={color}>
					    <div className="card-content">
				            <div className="row">
							    <div className="col-30">
							    	<img src={d.pageImage} style={divStyle}/>
							    </div>
							    <div className="col-50" onClick={()=>{this.openModal(d._id)}}>
							    	<div className="card-content-inner" style={info}>
							    	  {d.title}
							    	  <div className="color-gray my-small-gray">{d.pageName}</div>
							    	  <div className="color-gray my-small-gray">{d.date}</div>
								    </div>
							    </div>
							    <div className="col-20 my-clickable" style={test} onClick={()=>{this.book(d._id)}}>
									<a href="#" style={upStyle}>{d.upvotes.length.toString()} <i className="fa fa-thumbs-o-up"></i></a>
							    </div>
							</div>
					    </div>
					</div> 
				</div>
			</div>
		)
	}
}

export default DealLi;