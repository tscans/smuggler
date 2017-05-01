import React from 'react';
import {browserHistory} from 'react-router';

class PageVerify extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            accepted: false
        }
    }
    businessVerify(){
    	this.setState({submitted:true});
    	var myApp = new Framework7();
    	if(!this.state.accepted){
    		myApp.alert('You must accept the terms of service.', "Warning!");
    		this.setState({submitted:false});
    		return;
    	}
		var cardToken = {
	        "number": this.refs.cred.value.trim(),
	        "cvc": this.refs.cvc.value.trim(),
	        "exp_month": this.refs.mm.value.trim(),
	        "exp_year": this.refs.yy.value.trim()
	    }
	    Stripe.setPublishableKey(Meteor.settings.public.StripePub);
	    	Stripe.createToken(cardToken, function(status, result){
		        if(result.error){
		          myApp.alert(result.error.message, "Warning!");
		        }else{
		          Meteor.call('profile.businessVerify', result.id, (error, data)=>{
			            if(error){
			              var myApp = new Framework7();
			              myApp.alert(error.message, "Warning!");
			            }else{
			    			browserHistory.push('/page/');
			    			var myApp = new Framework7();
			    			myApp.alert('You are verified', "Congrats!");
		            	}
		          	})
	        	}
	      	})
	     this.setState({submitted:false});
	    
	}
	submission(){
        if(this.state.submitted){
            return(
                <div>
                    <img src="/ring.gif" height="50px"/>
                </div>
            )
        }
        else{
            return(
                <div>
                    <a href="#" className="button button-fill color-green button-raised my-crunch-btn" onClick={this.businessVerify.bind(this)}>Verify</a> 
                </div>
            )
        }
    }
    closeModal(){
        var myApp = new Framework7();
        myApp.closeModal();
    }
    tosa(){
    	if(this.state.accepted){
    		return(
    			<div>
    				Accept Terms of Service
                    <a href="#" className="button button-fill color-green button-raised my-crunch-btn"><i className="fa fa-check-circle-o" aria-hidden="true"></i> Accepted!</a> 
                </div>
    		)
    	}
    	else{
    		return(
    			<div>
    				Accept Terms of Service
                    <a href="#" className="button button-fill color-red button-raised my-crunch-btn" onClick={()=>{this.setState({accepted: true})}}>Click to Accept</a> 
                </div>
    		)
    	}
    }
    toso(){
    	var myApp = new Framework7();
    	myApp.popup('.popup-about');
    }
    toss(){
    	return(
    		<div>
    			<div className="popup popup-about">
				    <div className="content-block my-no-padding">
	                  <div className="navbar theme-green my-card-3">
	                    <div className="navbar-inner">
	                        <div className="right my-left-5"><i onClick={this.closeModal.bind(this)} className="fa fa-times"></i></div>
	                    </div>
	                  </div>
	                  <div className="my-break-40"></div>
	                </div>
	                <div>
	                	If you are bad we will charge your credit card $5,000. Don't be bad.
	                </div>
				</div>
    		</div>
    	)
    }
	render(){
		var wide = {
			width: "80%",
			marginLeft: "10%"
		}
		var left = {
			width: "50%",
			float: "left"
		}
		var right = {
			width: "50%",
			float: "right"
		}
		var m50 = {
			marginTop: "50px"
		}
		return(
			<div className="my-card-container">
				<h2 className="color-green">Business Verification</h2>
				<p>We want to know if you really are a business and not an imposter.</p>
				<p>We at Veer take pride in building strong communities and protecting the confidence our app provides.</p>
				<p>Our verification process requires you to sign up using a credit card and agree to our terms of service. Veer if free to use and there are no monthly subscription charges.</p>
				<div style={wide}>
					<div className="item-inner">
	                  <div className="item-input">
	                    <input type="text" ref="cred" placeholder="Credit Card Number"/>
	                  </div>
	                </div>
	                <div className="item-inner">
	                  <div className="item-input">
	                    <input type="text" ref="cvc" placeholder="CVC"/>
	                  </div>
	                </div>
	                <div className="item-inner" style={left}>
	                  <div className="item-input">
	                    <input type="text" ref="mm" placeholder="MM"/>
	                  </div>
	                </div>
	                <div className="item-inner" style={right}>
	                  <div className="item-input">
	                    <input type="text" ref="yy" placeholder="YY"/>
	                  </div>
	                </div>
                </div>
                <br/>
                <br/>
                <div>
                    <a href="#" className="button" onClick={this.toso.bind(this)}>View Terms of Service</a> 
                </div>
                <br/>
                {this.tosa()}
                <div style={m50}></div>
                {this.submission()}
                {this.toss()}
			</div>
		)
	}
}

export default PageVerify;