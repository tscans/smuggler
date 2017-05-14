import React from 'react';
import {browserHistory} from 'react-router';

class SignIn extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			loader: false
		}
	}
	loadButton(){
		if(this.state.loader){
			return(
				<div className="my-loader">

				</div>
			)
		}
		else{
			return(
				<div>
					<button className="btn btn-positive btn-block">Sign Up</button>
				</div>
			)
		}
	}
	signIn(event){
		event.preventDefault();
		if(this.state.loader){
			
			return;
		}
		console.log('signIn');
		this.setState({loader: true});
		var ema = this.refs.email.value.trim();
        var pss1 = this.refs.pass.value.trim();
		Meteor.loginWithPassword(ema, pss1, (error, data) => {
			if(error){
        		console.log("There was an error");
                this.setState({loader: false});
                console.log(error);
            }
            else{
            	this.refs.email.value = "";
		        this.refs.pass.value = "";
		        this.setState({loader: false});
		        browserHistory.push("/game/");
            }
		});
		
	}
	render(){
		return(
			<div>
				<form onSubmit={this.signIn.bind(this)}>
				  <input type="email" ref="email" placeholder="Email"/>
				  <input type="password" ref="pass" placeholder="Password"/>
				  <button className="btn btn-positive btn-block">Sign In</button>
				</form>
			</div>
		)
	}
}

export default SignIn;