import React, {Component} from 'react';
import {browserHistory} from 'react-router';
var zipcodes = require('zipcodes');

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}
	closeModal(){
		var myApp = new Framework7();
		myApp.closeModal();
	}
	buttonPlace(){
		if(!this.state.loading){
			return(
			  <li onClick={this.signUp.bind(this)}>
                <a href="#" className="item-link color-green list-button">Sign Up</a>
              </li>
			)
		}
		else{
			return(
				<img src="/ring.gif" height="50px"/>
			)
		}
	}
	signUp(event){
		event.preventDefault();
		this.setState({loading: true});
		var myApp = new Framework7();

		var ema = this.refs.email.value.trim();
        var pss1 = this.refs.password.value.trim();
        var pss2 = this.refs.password2.value.trim();
        var name = this.refs.name.value.trim();
        var zip = this.refs.zip.value.trim();
        if(ema == "" || pss1 == "" || pss2 == "" || name == "" || zip == ""){
            myApp.alert('Please complete all the fields','Warning!');
            console.log("enter data");
            this.setState({loading: false});
            return;
        }
        else if(pss1 != pss2){
            myApp.alert(`Passwords don't match`, `Warning!`);
        	console.log('mismatch passwords');
            this.setState({loading: false});
            return;
        }
        
        else{
            var zippy = zipcodes.lookup(zip);
            if(!zippy){
                myApp.alert(`Please use a real zip code`, `Warning!`);
                this.setState({loading: false});
                return;
            }
            Accounts.createUser({
                email: ema,
                password: pss1
            },(error)=>{
                if(error){
                    myApp.alert(error.reason, `Warning!`);
                    this.setState({loading: false});

                    console.log(error);
                    return;
                }
            });

            Meteor.loginWithPassword(ema, pss1);
            Meteor.call('profile.makeUser', name,zip, (error, data)=> {
            	if(error){
                    myApp.alert(error.reason, `Warning!`);
            		console.log("There was an error");
            		console.log(error);
                    this.setState({loading: false});
                    Meteor.logout();
            	}
            	else{
            		console.log(data)
            		
            		this.refs.email.value = "";
                    this.refs.password.value = "";
                    this.refs.password2.value = "";
                    this.refs.name.value = "";
                    this.refs.zip.value = "";
                    var myApp = new Framework7();
					myApp.closeModal();
					browserHistory.push('/user/')
					myApp.alert(`Be sure to check your email and confirm your account. Welcome to McDeal!`, `Thanks!`);
                    
            	}
            	
            })
	        
        }

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
			    <h2>Sign Up</h2>
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
	                      <div className="item-title label">Name</div>
	                      <div className="item-input">
	                        <input type="text" ref="name" placeholder="Your Name"/>
	                      </div>
	                      
	                    </div>
	                  </li>
	                  <li className="item-content">
	                    <div className="item-inner">
	                      <div className="item-title label">Zip Code</div>
	                      <div className="item-input">
	                        <input type="text" ref="zip" placeholder="Zip Code"/>
	                      </div>
	                      
	                    </div>
	                  </li>
	                  <li className="item-content">
	                  	<div className="item-inner">
	                  	  <div className="item-title label">Password</div>
	                      <div className="item-input">
	                        <input type="password" ref="password" placeholder="Password"/>
	                      </div>
	                      
	                    </div>
	                  </li>
	                  <li className="item-content">
	                  	<div className="item-inner">
	                  	  <div className="item-title label">Confirm</div>
	                      <div className="item-input">
	                        <input type="password" ref="password2" placeholder="Confirm Password"/>
	                      </div>
	                      
	                    </div>
	                  </li>
	                </ul>
	              </div>
	              <div className="list-block">
	                <ul>
	                  {this.buttonPlace()}
	                </ul>
	                <div className="my-break-50"></div>
	              </div>
	            </form>
			</div>
        );
    }
}

export default SignUp;
