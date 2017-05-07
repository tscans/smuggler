import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class NavBody extends Component {
	logout(event){
        event.preventDefault();
        var myApp = new Framework7();
	    myApp.closePanel(false);
	    myApp.closeModal();
        Meteor.logout();
        this.handleLogoutPush();
    }
    handleLogoutPush(){
    	var myApp = new Framework7();
    	browserHistory.push('/');
        myApp.alert(``,`Logged Out`);
    }
    toPage(){
		var myApp = new Framework7();
 
	    myApp.closePanel(false);
		browserHistory.push("/page/deals/");
	}
	forBusiness(){
		var myApp = new Framework7();
 
	    myApp.closePanel(false);
	    var w = window.location.pathname;
	    if(w.includes("/blist/") || w.includes("/dlist/") || w.includes("/jlist/")){
	      browserHistory.push("/user/blist/");
	    }
	    else{
	      browserHistory.push("/user/b/");
	    }
	}
	forJobs(){
		var myApp = new Framework7();
 
	    myApp.closePanel(false);
	    var w = window.location.pathname;
	    if(w.includes("/blist/") || w.includes("/dlist/") || w.includes("/jlist/")){
	      browserHistory.push("/user/jlist/");
	    }
	    else{
	      browserHistory.push("/user/j/");
	    }
	}
	forDeals(){
		var myApp = new Framework7();
 
	    myApp.closePanel(false);
		var w = window.location.pathname;
	    if(w.includes("/blist/") || w.includes("/dlist/") || w.includes("/jlist/")){
	      browserHistory.push("/user/dlist/");
	    }
	    else{
	      browserHistory.push("/user/d/");
	    }
	}
    render() {
    	var pageStyle = {
    		marginTop: "15vh"
    	}
        return (
        	<div>
        		<p className="buttons-row">
				  <a href="#" className="button" onClick={this.forBusiness.bind(this)}>Businesses</a>
				</p>
        		<p className="buttons-row">
				  <a href="#" className="button" onClick={this.forDeals.bind(this)}>Daily Deals</a>
				</p>
				<p className="buttons-row">
				  <a href="#" className="button" onClick={this.forJobs.bind(this)}>Jobs</a>
				</p>
				<div className="list-block-label">Veer Copyright 2017</div>
				<p className="buttons-row" style={pageStyle}>
				  <a href="#" className="button color-green" onClick={this.logout.bind(this)}>Logout</a>
				</p>   
				<p className="buttons-row">
				  <a href="#" className="button color-red" onClick={this.toPage.bind(this)}>My Business</a>
				</p> 
			</div>
        );
    }
}

export default NavBody;
