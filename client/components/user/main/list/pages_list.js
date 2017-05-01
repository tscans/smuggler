import React from 'react';
import SinglePage from '../page/single_page';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../../imports/collections/profile';
import {Page} from '../../../../../imports/collections/page';
import {Deal} from '../../../../../imports/collections/deal';
import SubNav from '../external/sub_nav';
import {browserHistory} from 'react-router';

class PagesList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			pageID: null
		}
	}
	toMap(){
		browserHistory.push("/user/map/");
		this.forceUpdate();
	}
	favorite(pid){
		Meteor.call("page.favorite",pid,(error,data)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log(data);
			}
		})
	}
	renderList(){
		var notfav = Page.find({_id: {$nin:this.props.profile.favorite}}).fetch();
		var jjj = notfav;

		jjj.sort(function(b,a) {
		    return parseFloat(a.favorites) - parseFloat(b.favorites);
		});
		return jjj.map(p=>{
			var myStyle = {
				backgroundImage: 'url(' + p.image + ')',
				width: "40%",
				height: "12vh",
				float: "left"
			}
			var myStyle2 = {
				width: "59%",
				height: "12vh",
				float: "right"
			}
			return(
				<div className="go-fucking-center" key={p._id}>
					<div className="card demo-card-header-pic">
					  <div onClick={()=>{this.pageUp(p._id)}}>
						  <div style={myStyle} className="card-header color-white no-border"></div>
						  <div style={myStyle2}>
						  	<h3>{p.pageName}</h3>
						  </div>
					  </div>
					  <div className="card-footer">
					    <a onClick={()=>{this.favorite(p._id)}} href="#" className="link my-link-right my-gray-outline">Favorite {p.favorites.toString()} <i className="fa fa-star" aria-hidden="true"></i></a>
					  </div>
					</div>
				</div>
			)
		})
	}
	renderFavorites(){
		var fav = Page.find({_id: {$in:this.props.profile.favorite}}).fetch();
		var jjj = fav;

		jjj.sort(function(b,a) {
		    return parseFloat(a.favorites) - parseFloat(b.favorites);
		});
		return jjj.map(p=>{
			var myStyle = {
				backgroundImage: 'url(' + p.image + ')',
				width: "40%",
				height: "12vh",
				float: "left"
			}
			var myStyle2 = {
				width: "59%",
				height: "12vh",
				float: "right"
			}
			return(
				<div className="go-fucking-center" key={p._id}>
					<div className="card demo-card-header-pic">
					  <div onClick={()=>{this.pageUp(p._id)}}>
						  <div style={myStyle} className="card-header color-white no-border"></div>
						  <div style={myStyle2}>
						  	<h3>{p.pageName}</h3>
						  </div>
					  </div>
					  <div className="card-footer">
					    <a onClick={()=>{this.favorite(p._id)}} href="#" className="link my-link-right">Favorite {p.favorites.toString()} <i className="fa fa-star" aria-hidden="true"></i></a>
					  </div>
					</div>
				</div>
			)
		})
		
	}
	pageUp(pid){
		this.setState({pageID: pid});
		var myApp = new Framework7();
		myApp.popup('.popup-about');
	}
	renderPage(){
		return(
			<div>
				<SinglePage pageID={this.state.pageID} pages={this.props.pages} profile={this.props.profile}/>
			</div>
		)
	}
	render(){
		if(!this.props.profile){
			return<div></div>
		}
		var m50 = {
			marginTop: "50px"
		}
		return(
			<div>
				<SubNav />
				<div className="my-card-container2">
					<h3 className="color-blue">Favorite Businesses</h3>
					{this.renderFavorites()}
					<hr/>
					<h3 className="color-green">Local Businesses</h3>
					{this.renderPage()}
					{this.renderList()}
					<div style={m50}></div>
				</div>
				<a href="#" className="floating-button color-green" onClick={this.toMap.bind(this)}>
		            <i className="fa fa-map" aria-hidden="true"></i>
		        </a>
			</div>
		)
	}
}

export default createContainer((props)=>{
    Meteor.subscribe("profile");
    Meteor.subscribe('localPages');
    Meteor.subscribe("localDeals");

    return {profile: Profile.findOne({}), pages: Page.find({}).fetch(),
     deals: Deal.find({}).fetch()
 	}

	
}, PagesList); 


