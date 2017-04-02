import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: true,
			signText: "Sign In",
			destination: "/user/",
			wording: "Sign In As Business Instead",
			loading: false
		}
	}
	closeModal(){
		var myApp = new Framework7();
		myApp.closeModal();
	}
	flipUser(){
		console.log('run')
		if(this.state.user){
			this.setState({signText: "Sign In Business", destination: "/page/", user: false, wording: "Sign In As User"})
		}
		else{
			this.setState({signText: "Sign In", destination: "/user/", user: true, wording: "Sign In As Business Instead"})
		}
	}
	buttonPlace(){
		if(!this.state.loading){
			return(
			  <li>
                <a href="#" className="item-link color-green list-button">{this.state.signText}</a>
              </li>
			)
		}
		else{
			return(
				<img src="/ring.gif" height="50px"/>
			)
		}
	}
	signIn(event){
		event.preventDefault();
		console.log('signIn');
		var myApp = new Framework7();
		
        this.setState({loading: true});
		var ema = this.refs.email.value.trim();
        var pss1 = this.refs.pass.value.trim();
		Meteor.loginWithPassword(ema, pss1, (error, data) => {
			if(error){
                myApp.alert(`User/Password does not match`, `Warning!`);
        		console.log("There was an error");
                this.setState({loading: false});
        		console.log(error);
            }
            else{
            	this.refs.email.value = "";
		        this.refs.pass.value = "";
                
		        myApp.closeModal();
				browserHistory.push(this.state.destination)
            }
		});
		
	}
    render() {
        return (
        	<div>
        		<div className="content-block my-no-padding">
			   	  <div className="navbar theme-green my-card-3">
				    <div className="navbar-inner">
				    	<div className="right my-left-5"><i onClick={this.closeModal.bind(this)} className="fa fa-times"></i></div>
				    </div>
				  </div>
				  <div className="my-break-40"></div>
			   </div>
			    <form>
			    <h2>Sign In</h2>
	              <div className="list-block">
	                <ul>
	                  <li className="item-content">
	                    <div className="item-inner">
	                      <div className="item-title label">Email</div>
	                      <div className="item-input">
	                        <input type="email" ref="email" placeholder="Email"/>
	                      </div>
	                      
	                    </div>
	                  </li>
	                  <li className="item-content">
	                  	<div className="item-inner">
	                      <div className="item-title label">Password</div>
	                      <div className="item-input">
	                        <input type="password" ref="pass" placeholder="Password"/>
	                      </div>
	                      
	                    </div>
	                  </li>
	                </ul>
	              </div>
	              <div className="list-block" onClick={this.signIn.bind(this)}>
	                <ul>
	                  {this.buttonPlace()}
	                </ul>
	                
	              </div>
	            </form>
	            <div className="my-break-50">
				      
			    </div>
                <div className="list-block-label"><a href="#" onClick={this.flipUser.bind(this)}>{this.state.wording}</a></div>
			</div>
        );
    }
}

export default SignIn;
