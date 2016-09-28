import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';

class OrgSignup extends Component {
	register(event){
        event.preventDefault();
        var ema = this.refs.email.value.trim();
        var pss1 = this.refs.password.value.trim();
        var pss2 = this.refs.password2.value.trim();
        var name = this.refs.name.value.trim();

        if(ema == "" || pss1 == "" || pss2 == "" || name == ""){
            console.log("enter data");
        }
        else if(pss1 != pss2){
        	console.log('mismatch passwords');
        }
        else{
            Meteor.call('profile.makeUser', ema, pss1, (error, data)=> {
            	if(error){
            		console.log("There was an error");
            		console.log(error);
            	}
            	else{
            		console.log(data)
            		Meteor.loginWithPassword(ema, pss1);
            		var usid = data.toString();
					
            		Meteor.call('profile.insertData', name, usid, (error, data) => {
            			if(error){
            				console.log("There was an error");
            				console.log(error);
            			}
            			else{
		            		this.refs.email.value = "";
					        this.refs.password.value = "";
					        this.refs.password2.value = "";
					        this.refs.name.value = "";
					        browserHistory.push('/admin-select/')
            			}
            		})
            		
            	}
            	
            })
	        
        }

    }

    render() {
        return (
        	<div>
        		<div className="container-fluid bg-1 text-center">
				  <h2 className="margin">Sign Up As an Organization</h2>
				  <form className="col-xs-6 col-xs-offset-3 card-3 white-back" onSubmit={this.register.bind(this)}>
        			<div className="lower"></div>
					  <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Email address</label>
					    <input type="email" className="form-control foc-card" ref="email" id="exampleInputEmail1" placeholder="Email"/>
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Your Name</label>
					    <input type="text" className="form-control foc-card" ref="name" placeholder="Name"/>
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputPassword1">Password</label>
					    <input type="password" className="form-control foc-card" ref="password" id="exampleInputPassword1" placeholder="Password"/>
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputPassword1">Confirm Password</label>
					    <input type="password" className="form-control foc-card" ref="password2" id="exampleInputPassword2" placeholder="Password"/>
					  </div>
					  <button type="submit" className="btn btn-success card-1 top-bot-not">Sign Up</button>
					</form>
				</div>
        	</div>
        );
    }
}


export default OrgSignup;









