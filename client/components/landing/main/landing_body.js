import React, {Component} from 'react';
import SignIn from './sign_in';
import SignUp from './sign_up';

class LandingBody extends Component {
	constructor(props) {
		super(props);
		this.state = {
			switcher: "login"
		}
	}
	modal(){
		console.log('clicked')
		var myApp = new Framework7();
 
    	var $$ = Dom7;
		myApp.alert('Here goes alert text');
	}
	signIn(){
		this.setState({switcher: "login"});
		var myApp = new Framework7();
		 
		myApp.loginScreen();
	}
	signUp(){
		this.setState({switcher: "signUp"});
		var myApp = new Framework7();
		 
		myApp.loginScreen();
	}
	handleSign(){
		if(this.state.switcher == "login"){
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
    render() {
        return (
        	<div>
			    <div className="page-content my-home-background">
				    <div className="content-block">
				    	<h1 className="my-green-text my-home-title">Welcome to Veer</h1>
				    	<div className="my-break-50"></div>
				    	<div className="row">
				    		<div className="col-10"></div>
					    	<p className="buttons-row col-80">
					    	  <a href="#" onClick={this.signUp.bind(this)} className="button button-big button-fill button-raised color-green">Sign Up</a>
					    	  <span className="col-10"></span>
					    	  <a href="#" onClick={this.signIn.bind(this)} className="button button-big button-fill button-raised color-blue">Sign In</a>
							</p>
							<div className="col-10"></div>
						</div> 
						<div className="login-screen">
						    {this.handleSign()}
						</div>
				    </div>
				  </div>
			</div>
        );
    }
}

export default LandingBody;
