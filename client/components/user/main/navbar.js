import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import NavBody from './nav_body';

class Navbar extends Component {
	openRight(){
		console.log('clicked')
		var myApp = new Framework7();
 
    	var $$ = Dom7;
    	myApp.openPanel('left');
	}
	closeRight(){
		console.log('clicked')
		var myApp = new Framework7();
 
    	var $$ = Dom7;
    	myApp.closePanel();
	}
	goHome(event){
      event.preventDefault();
      
      browserHistory.push('');
    }
    render() {
        return (
        	<div>
	        	<div className="navbar theme-green my-card-3">
				    <div className="navbar-inner">
				    	<div onClick={this.goHome.bind(this)} className="right my-nav-left my-clickable">Veer</div>
				    	<div className="right my-left-5"><i onClick={this.openRight.bind(this)} className="icon my-left-5 size-50 icon-bars"></i></div>
				    </div>
				</div>
				<div className="panel-overlay"></div>
				  <div className="panel panel-left panel-cover">
				    <div className="content-block my-no-padding">
				   	  <div className="navbar theme-green my-card-3">
					    <div className="navbar-inner">
					    	<div className="right my-left-5"><i onClick={this.closeRight.bind(this)} className="fa fa-times"></i></div>
					    </div>
					  </div>
					  <div className="my-break-40">
				      
				      </div>
				      <h2>User</h2>
				      <NavBody />
				   </div>
				</div>
        	</div>
        );
    }
}

export default Navbar;
