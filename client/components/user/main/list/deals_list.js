import React from 'react';
import DealModal from './deal_modal';
import moment from 'moment';
import {createContainer} from 'meteor/react-meteor-data';
import {Deal} from '../../../../../imports/collections/deal';

class DealsList extends React.Component{
	constructor(props) {
		super(props);
		var x = false;
		var y = false;
		if(this.props.showModals){
			x = true;
		}
		if(this.props.removeFavorites){
			y = true;
		}
		this.state = {
			showModals: x,
			deal: null,
			removeFavorites: y
		}
	}
	upvote(did){
		
	}
	book(did){
		Meteor.call("profile.book", did, (error,data)=>{
			if(error){
				console.log(error)
			}
			else{
				console.log(data)
				Meteor.call("deal.upvoteDeal", did, (error,data)=>{
					if(error){
						console.log(error)
					}
					else{
						console.log(data)
					}
				})
			}
		})
	}
	openModal(d){
		this.setState({deal: d});
		var myApp = new Framework7();

		myApp.popup('.popup-about');

	}
	renderModal(){
		if(this.props.showModals){
			return(
				<DealModal deal={this.state.deal}/>
			)
		}
	}
	renderModalButton(d){
		if(this.props.showModals){
			return(
				<div>
					<p className="buttons-row" onClick={()=>{this.openModal(d)}}>
					  <a href="#" className="button button-raised">Show Special</a>
					</p>  
				</div>
			)
		}
	}
	renderCards(){
		if(this.props.deals.length == 0){
			return(
				<div>
					<h2>No Special.</h2>
				</div>
			)
		}
		if(this.state.removeFavorites){
			var jjj = this.props.partDeals;
		}
		else{
			var jjj = this.props.deals;
		}
		
		
		if(!this.state.showModals){
			var aaa = [];
			var d = new Date();
			var today = moment(d).format("ll");
			for(var i =0; i < jjj.length; i++){
				if(jjj[i].date == today){
					aaa.push(jjj[i]);
				}
			}
			jjj = aaa;
		}
		
		var iii = [];
		if(this.state.showModals){
			for(var i = 0; i< jjj.length; i++){
				console.log(jjj[i])
				if(this.props.profile.book.includes(jjj[i]._id)){
					iii.push(jjj[i]);
				}
			}
			jjj = iii;
		}
		jjj.sort(function(a, b) {
		    return parseFloat(a.upvotes.length) - parseFloat(b.upvotes.length);
		});
        return jjj.reverse().map(d=>{
    		var divStyle = {
	            height: "10vh",
	            padding: "0px",
	            margin: "0px"
	        }
        	
        	var upStyle = {
        		color: "gray"
        	}
        	var info = {
        		textAlign: "left",
        		padding: "0px",
        		paddingTop: "1px"
        	}
        	var test = {
        		height: "10vh",
        		paddingTop: "2vh",
        		borderRadius: "0px",
				border: "1px solid gray"
        	}
			if(d.upvotes.includes(Meteor.userId())){
				upStyle = {
					color: "#2196F3"
				}
				test = {
	        		height: "10vh",
	        		paddingTop: "2vh",
	        		borderRadius: "0px",
					border: "1px solid #2196F3"
	        	}
			}
			return(
				<div key={d._id}>
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
							    <div className="col-20 my-clickable" style={test} onClick={()=>{this.book(d._id)}}>
									<a href="#" style={upStyle}>Favorite {d.upvotes.length.toString()} <i className="fa fa-bookmark"></i></a>
							    </div>
							</div>
					    </div>
					</div> 
				</div>
			)
		})
	}
	render(){
		if(!this.props.deals || !this.props.profile){
			return(
				<div>
					<img src="/ring.gif" />
				</div>
			)
		}
		return(
			<div>
				{this.renderModal()}
				<div>
					<div className="go-fucking-center">
						{this.renderCards()}
					</div>
				</div>
			</div>
		)
	}
}

export default createContainer((props)=>{
	Meteor.subscribe("localDeals");

    return {partDeals: Deal.find({_id: { $nin: props.profile.book }}).fetch()}
	
}, DealsList);  




