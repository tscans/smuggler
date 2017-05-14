import React from 'react';

class Footer extends React.Component{
	switchTabs(b){
		this.props.switchTabs(b);
	}
	render(){
		var pro = "";
		var bold = "";
		if(this.props.pro){
			pro = "active";
		}
		else{
			bold = "active";
		}
		return(
			<div>
				<nav className="bar bar-tab">
				  <a className={"tab-item "+pro} onClick={()=>{this.switchTabs(true)}}>
				    Profile
				  </a>
				  <a className={"tab-item "+bold} onClick={()=>{this.switchTabs(false)}}>
				    Market
				  </a>
				</nav>
			</div>
		)
	}
}

export default Footer;