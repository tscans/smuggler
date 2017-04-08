import React from 'react';
import DealsList from '../list/deals_list';
import {createContainer} from 'meteor/react-meteor-data';
import {Deal} from '../../../../../imports/collections/deal';
import moment from 'moment';

function getForDay(arob, day){
	var rv = [];
	for(var i = 0;i<arob.length;i++){
		if(arob[i].date == day){
			rv.push(arob[i])
		}
	}
	return rv;
}

class SinglePage extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			currentBody: 'd',
			currentDay: null
		}
	}
	renderBody(){
		if(this.state.currentBody == 'd'){
			var myDeals;
			console.log(this.state.currentDay)
			console.log(this.props.singleDeals)
			if(this.state.currentDay){
				myDeals = getForDay(this.props.singleDeals,this.state.currentDay);
			}
			else{
				var d = new Date();
				var day = moment(d).format("ll");
				myDeals = getForDay(this.props.singleDeals,day)
			}
			return(
				<div>
					<a href="#" className="button button-fill color-yellow" onClick={this.openSchedule.bind(this)}>
	                	Future Deals <i className="fa fa-calendar" aria-hidden="true"></i>
	            	</a>
					<DealsList deals={myDeals} profile={this.props.profile} currentDay={this.state.currentDay}/>
				</div>
			)
		}
	}
	renderPopOver(){
		var d = new Date();
		return(
			<div>
				<div className="picker-modal picker-info">
				    <div className="toolbar">
				      <div className="toolbar-inner">
				        <div className="left"></div>
				        <div className="right"><a href="#" className="close-picker color-white">Done</a></div>
				      </div>
				    </div>
				    <div className="picker-modal-inner">
				      <div className="content-block my-list-wrap">
				        <div className="list-block">
						    <ul>
						      <li onClick={()=>{this.setState({currentDay: moment(d).add(0,'day').format("ll")})}}>
						        <a href="#" className="list-button item-link">{moment(d).add(0,'day').format("ll")}</a>
						      </li>
						      <li onClick={()=>{this.setState({currentDay: moment(d).add(1,'day').format("ll")})}}>
						        <a href="#" className="list-button item-link">{moment(d).add(1,'day').format("ll")}</a>
						      </li>
						      <li onClick={()=>{this.setState({currentDay: moment(d).add(2,'day').format("ll")})}}>
						        <a href="#" className="list-button item-link">{moment(d).add(2,'day').format("ll")}</a>
						      </li>
						      <li onClick={()=>{this.setState({currentDay: moment(d).add(3,'day').format("ll")})}}>
						        <a href="#" className="list-button item-link">{moment(d).add(3,'day').format("ll")}</a>
						      </li>
						      <li onClick={()=>{this.setState({currentDay: moment(d).add(4,'day').format("ll")})}}>
						        <a href="#" className="list-button item-link">{moment(d).add(4,'day').format("ll")}</a>
						      </li>
						    </ul>
						</div>
				      </div>
				    </div>
				  </div>
			</div>
		)
	}
	openSchedule(){
		var myApp = new Framework7();
		myApp.pickerModal('.picker-info')
	}
	render(){
		if(!this.props.singleDeals){
			return<div></div>
		}
		if(!this.props.pageID){
			return(
				<div>
					<div className="popup popup-about">
			        </div>
				</div>
			)
		}
		else{
			function search(nameKey, myArray){
			    for (var i=0; i < myArray.length; i++) {
			        if (myArray[i]._id === nameKey) {
			            return myArray[i];
			        }
			    }
			}

		var p = search(this.props.pageID, this.props.pages);
		}
		var bk = {
			backgroundImage: 'url(' + p.image + ')',
		    height: "40vh"
		}
		var bn = {
			color: "#444444",
			backgroundColor: "#ffffff",
			padding: "3px",
			border: "2px solid #4CAF50",
			marginTop: "18vh",
			backgroundSize: "cover",
    		backgroundPosition: "center"
		}
		var fl = {
			position: "fixed"
		}
		return(
			<div>
				<div className="popup popup-about">
				<div className="navbar theme-green my-card-3">
                    <div className="navbar-inner">
                        <div className="right my-left-5">
                        	<a href="#" className="close-popup">
                        		<i className="fa fa-times color-white"></i>
                        	</a>
                        </div>
                    </div>
                </div>
				{this.renderPopOver()}
		        <div className="content-block my-page-box">
					<div className="card demo-card-header-pic">
					  <div style={bk} className="card-header color-white no-border">
					  	<div style={bn}>{p.pageName}</div>
					  </div>
					  <div className="card-content">
					    <div className="toolbar toolbar-bottom">
						    <div className="toolbar-inner">
						      <a href="#" className="link">Deals</a>
						      <a href="#" className="link">Feedback</a>
						      <a href="#" className="link">Info</a>
						    </div>
						</div>
						{this.renderBody()}
					  </div>
					</div>
		          </div>
		        </div>
			</div>
		)
	}
}

export default createContainer((props)=>{
	console.log(props.pageID)
    Meteor.subscribe("singleLocalDeals", props.pageID);

    return {singleDeals: Deal.find({}).fetch()}

	
}, SinglePage);  









