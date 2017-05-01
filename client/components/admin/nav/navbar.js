import React from 'react';
import {browserHistory} from 'react-router';

class Navbar extends React.Component{
	goHome(){
		browserHistory.push("/")
	}
	render(){
		return(
			<div>
				<div className="navbar theme-green my-card-3">
				    <div className="navbar-inner">
				    	<div onClick={this.goHome.bind(this)} className="right my-nav-left my-clickable"><img src="/navicon.png" height="40px"/></div>
				    	<div className="right my-left-5">Admin Page</div>
				    </div>
				</div>
			</div>
		)
	}
}

export default Navbar;