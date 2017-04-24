import React from 'react';
import DealsList from '../list/deals_list';
import {createContainer} from 'meteor/react-meteor-data';
import {Deal} from '../../../../../imports/collections/deal';
import PageInfo from './page_info';
import moment from 'moment';
import PageReviews from './page_reviews';

class SinglePage extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			currentBody: 'd'
		}
	}
	renderBody(){
		if(this.state.currentBody == 'd'){
			var myDeals = this.props.singleDeals;
			console.log(myDeals);
			return(
				<div>
					<DealsList deals={myDeals} profile={this.props.profile} onePage={true}/>
				</div>
			)
		}
		else if(this.state.currentBody == "i"){
			function search(nameKey, myArray){
			    for (var i=0; i < myArray.length; i++) {
			        if (myArray[i]._id === nameKey) {
			            return myArray[i];
			        }
			    }
			}

			var p = search(this.props.pageID, this.props.pages);
			return(
				<div>
					<PageInfo page={p} />
				</div>
			)
		}
		else if(this.state.currentBody == "f"){
			function search(nameKey, myArray){
			    for (var i=0; i < myArray.length; i++) {
			        if (myArray[i]._id === nameKey) {
			            return myArray[i];
			        }
			    }
			}

			var p = search(this.props.pageID, this.props.pages);
			return(
				<div>
					<PageReviews page={p}/>
				</div>
			)
		}
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
		if(!p){
			return<div></div>
		}
		}
		var bk = {
			backgroundImage: 'url(' + p.image + ')',
		    height: "35vh"
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
                        <div className="right">
                    		{p.pageName}
                    	</div>
                    </div>
                </div>
		        <div className="content-block my-page-box">
					<div className="card demo-card-header-pic">
					  <div style={bk} className="card-header color-white no-border">
					  	<div style={bn}>Favorites - {p.favorites.toString()}</div>
					  </div>
					  	<p className="buttons-row my-btn-5">
					  	  <a href="#" className="button color-red" onClick={()=>{this.setState({currentBody: "d"})}}>Deals</a><hr width="1" size="5%"/>
						  <a href="#" className="button color-green" onClick={()=>{this.setState({currentBody: "f"})}}>Reviews</a><hr width="1" size="5%"/>
						  <a href="#" className="button color-blue" onClick={()=>{this.setState({currentBody: "i"})}}>Info</a>
						</p>
						{this.renderBody()}
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









