import React from 'react';
import SinglePage from '../page/single_page';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../../imports/collections/profile';
import {Page} from '../../../../../imports/collections/page';
import {Deal} from '../../../../../imports/collections/deal';
import SubNav from '../external/sub_nav';

class PagesList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			pageID: null
		}
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
		var jjj = this.props.pages;

		jjj.sort(function(a, b) {
		    return parseFloat(a.favorites) - parseFloat(b.favorites);
		});
		return jjj.reverse().map(p=>{
			var myStyle = {
				backgroundImage: 'url(' + p.image + ')',
				width: "40%",
				height: "15vh",
				float: "left"
			}
			var myStyle2 = {
				width: "59%",
				height: "15vh",
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
		console.log('clicked',pid);
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
		return(
			<div>
				<SubNav />
				{this.renderPage()}
				{this.renderList()}
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


