import React from 'react';
import {browserHistory} from 'react-router';

class Header extends React.Component{
	handleLogout(){
		setTimeout(function(){ 
			browserHistory.push("/");
		}, 1000);
	}
	logout(){
		Meteor.logout();
		this.handleLogout();
	}
	sendHome(){
		if(!Meteor.userId()){
			this.handleLogout();
		}
	}
	render(){
		return(
			<div>
				{this.sendHome()}
				<header className="bar bar-nav">
				  <button className="btn pull-left" onClick={this.logout.bind(this)}>
				    Logout
				  </button>
				  <h1 className="title">Create a Game</h1>
				</header>
			</div>
		)
	}
}

export default Header;