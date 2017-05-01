import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';
import {Page} from '../../../../imports/collections/page';
import {browserHistory} from 'react-router';

class MainAdmin extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			mp: []
		}
	}
	welcome(){
		if(this.state.loaded || !this.props.profile.admin){
			return;
		}
		else{
			this.setState({loaded:true});
			var myApp = new Framework7();
			myApp.alert("Greetings, Sir "+this.props.profile.name, "Welcome!");
		}
	}
	search(e){
		if(e != "go"){
			e.preventDefault();
		}
		
		var s = this.refs.search.value.trim();
		var self = this;
		var rp = Meteor.subscribe("pageSearch", s,{onReady: function () { 
			z = Page.find({}).fetch();
			self.setState({mp: z})
	    }});
	}
	suspend(pid){
		Meteor.call("page.suspensionToggle",pid,(error,data)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log(data)
				this.search("go");
			}
		})
	}
	returnPages(){
		return this.state.mp.map(p=>{
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
			var red = "";
			if(p.online == false){
				red = "my-red-outline";
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
					    <a href="#" className={"link my-link-right "+red} onClick={()=>{this.suspend(p._id)}}>SUSPEND PAGE <i className="fa fa-ban" aria-hidden="true"></i></a>
					  </div>
					</div>
				</div>
			)
		})
	}
	render(){
		if(!this.props.profile){
			return<div></div>
		}
		if(this.props.profile.admin == false){
			browserHistory.push('/')
		}
		this.welcome();
		return(
			<div>
				<form className="searchbar searchbar-init" onSubmit={this.search.bind(this)}>
				    <div className="searchbar-input">
				      <input type="search" ref="search" placeholder="Search"/><a href="#" className="searchbar-clear"></a>
				    </div><a href="#" className="searchbar-cancel">Cancel</a>
				</form>
				{this.returnPages()}
			</div>
		)
	}
}

export default createContainer((props)=>{
    Meteor.subscribe("profile");

    return {profile: Profile.findOne({})}

	
}, MainAdmin); 