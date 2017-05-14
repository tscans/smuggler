import React, {Component} from 'react';
import Game from './game';
import SignIn from './sign_in';
import SignUp from './sign_up';
import {browserHistory} from 'react-router';

class MainLanding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signin: true,
			sm: "Sign Up"
		}
	}
	roll(){
		$("#myModalexample").addClass("active")
		//$("#info").removeClass("active") 
	}
	signFlip(){
		if(this.state.signin){
			this.setState({signin: false, sm: "Sign In"});
		}
		else{
			this.setState({signin: true, sm: "Sign Up"});
		}
	}
	sign(){
		if(this.state.signin){
			return(
				<SignIn />
			)
		}
		else{
			return(
				<SignUp />
			)
		}
	}
	checkSignedIn(){
		if(Meteor.userId()){
			browserHistory.push("/game/")
		}
	}
    render() {
    	var twothird = {
    		marginLeft: "20%",
    		marginRight: "20%",
    		marginTop: "-10vh"
    	}
    	var imgUp = {
    		marginTop: "-10vh"
    	}
    	var col = {
    		color: "white"
    	}
        return (
        	<div>
        		{this.checkSignedIn()}
        		<img style={imgUp} src="/swalpha.png" width="100%"/>
        		<div style={twothird}>
					{this.sign()}
					<p style={col} onClick={this.signFlip.bind(this)}>{this.state.sm}</p>
				</div>
        	</div>
        );
    }
}

export default MainLanding;
/*
<a onClick={this.roll.bind(this)} className="btn">Open modal</a>
				<div id="myModalexample" className="modal">
				  <Game/>
				  <a className="icon icon-close" href="#myModalexample"></a>
				</div>
*/