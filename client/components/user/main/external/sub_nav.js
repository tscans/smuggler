import React from 'react';
import {browserHistory} from 'react-router';

class SubNav extends React.Component{
	render(){
		var styles = {
			marginTop: "0",
			marginBottom: "0",
			marginLeft: "3vw"
		}
		var green = "";
		var blue = "";
		if(location.pathname.includes("/user/p/")){
			blue = "button-fill";
		}
		else{
			green = "button-fill"
		}
		return(
			<div>
				<p className="buttons-row" style={styles}>
				  <a href="#" onClick={()=>{browserHistory.push("/user/d/#/")}} className={"button color-green " + green}>Specials</a>
				  <a href="#" onClick={()=>{browserHistory.push("/user/p/#/")}} className={"button color-blue "+blue}>Businesses</a>
				</p>
			</div>
		)
	}
}

export default SubNav;