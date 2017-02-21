import React from 'react';
import {Profile} from '../../../../imports/collections/profile';
import {createContainer} from 'meteor/react-meteor-data';

class MemFinance extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			custCard: null,
			returnedOnce: false
		}
	}
	addCreditCard(){
		var cardToken = {
	        "number": this.refs.cred.value.trim(),
	        "cvc": this.refs.cvc.value.trim(),
	        "exp_month": this.refs.mm.value.trim(),
	        "exp_year": this.refs.yy.value.trim()
	    }

	    if(!this.props.profile.stripeCust){
	    	Stripe.createToken(cardToken, function(status, result){
		        if(result.error){
		          Bert.alert(result.error.message, 'danger', 'fixed-top' );
		        }else{
		          Meteor.call('stripe.userBuyCard', result.id, (error, data)=>{
			            if(error){
			              Bert.alert(error.message, 'danger', 'fixed-top' );
			              return;
			            }else{
			              console.log('worked fine')
			              Bert.alert('Card Successfully Addeed', 'success', 'fixed-top' );
		            	}
		          	})
	        	}
	      	})
	    }
	}
	removeCreditCard(){
		Meteor.call('stripe.removeCust', (error, data)=>{
			if(error){
				Bert.alert(error.message, 'danger', 'fixed-top' );
			}
			else{
				Bert.alert('Card Removed', 'default', 'fixed-top' );
				this.setState({custCard: null})
			}
		})
	}
	ifCard(){
		if(this.props.profile.stripeCust){

			this.findCredit();
			if(!this.state.custCard){
				return(
					<div>...Loading</div>
				)
			}
			return(
				<div>
					<p>You have a credit card stored already.</p>
					<div>
	    				<p>Current Saved Payment Information</p>
	    				<p><b>{this.state.custCard.cardInfo.brand}</b> ending in <b>{this.state.custCard.cardInfo.last4}</b> -- 
	    				Expires: <b>{this.state.custCard.cardInfo.exp_month}/{this.state.custCard.cardInfo.exp_year}</b></p>
	    			</div>
					<div className="col-md-6 col-md-offset-3">
						<button className="btn btn-default btn-extend card-1" onClick={this.removeCreditCard.bind(this)}>
			                <h4><span className="glyphicon glyphicon-credit-card"></span> Remove Credit Card</h4>
			            </button>
		            </div>
				</div>
			)
		}
		else{
			return(
				<div>
					<h3>Add a Credit Card to Your Account</h3>
					<div className="col-md-8">
						<label htmlFor="exampleInputEmail1">Card Number</label>
	                    <input type="text" className="form-control foc-card" ref="cred" placeholder="Card Number"/>
                    </div>
                    <div className="col-md-4">
                    	<label htmlFor="exampleInputEmail1">CVC</label>
                    	<input type="text" className="form-control foc-card input-small" ref="cvc" placeholder="CVC"/>
                    </div>
                    <div className="col-md-6 top-bot-not">
	                    <label htmlFor="exampleInputEmail1">Expiration MM</label>
	                    <input type="text" className="form-control foc-card input-small" ref="mm" placeholder="MM"/>
                    </div>
                    <div className="col-md-6 top-bot-not">
                    	<label htmlFor="exampleInputEmail1">Expiration YY</label>
                    	<input type="text" className="form-control foc-card input-small" ref="yy" placeholder="YY"/>
                    </div>
                    <div className="col-md-6 col-md-offset-3">
	                    <button className="btn btn-default btn-extend card-1" onClick={this.addCreditCard.bind(this)}>
			                <h4><span className="glyphicon glyphicon-credit-card"></span> Add Credit Card</h4>
			            </button>
		            </div>
				</div>
			)
		}
	}
	findCredit(){
		Meteor.call("stripe.obtainCardInfo", (error,data)=>{
			if(error){
				Bert.alert(error.message, 'danger', 'fixed-top' );
				console.log(error);
			}
			else{
				console.log(data);
				if(!this.state.returnedOnce){
					this.setState({custCard: data, returnedOnce: true})
				}
			}
		})
	}
	moomMember(){
		Meteor.call('profile.moonMember', (error, data)=>{
			if(error){
				Bert.alert(error.message, 'danger', 'fixed-top' );
				console.log(error);
			}
			else{
				console.log(data);
				Bert.alert("Thanks for supporting Unight by becomming a Moon Member!", 'success', 'fixed-top' );
			}
		})
	}
	noMoonMember(){
		Meteor.call('profile.noMoonMember', (error, data)=>{
			if(error){
				Bert.alert(error.message, 'danger', 'fixed-top' );
				console.log(error);
			}
			else{
				console.log(data);
				Bert.alert("Sad to see you go!", 'default', 'fixed-top' );
			}
		})
	}
	moon(){
		if(this.props.profile.memberAllowance == 1){
			return(
				<div>
					<p>You only have 1 gold membership.</p>
					<p>For just $5.00 per month you can get Moon Membership.</p>
					<p>Moon Membership grants you 5 total gold memberships to use at any business you choose.</p>
					<div className="col-md-6 col-md-offset-3">
	                    <button className="btn btn-default btn-extend card-1" onClick={this.moomMember.bind(this)}>
			                <h5><span className="glyphicon glyphicon-credit-card"></span> Purchase Moon Membership</h5>
			            </button>
		            </div>
				</div>
			)
		}
		else{
			return(
				<div>
					<p>You have Moon Membership!</p>
					<p>Thanks for using and supporting Unight!</p>
					<p>Your Moon Membership will renew {this.props.profile.moonDate}.</p>
					<div className="col-md-6 col-md-offset-3">
	                    <button className="btn btn-default btn-extend card-1" onClick={this.noMoonMember.bind(this)}>
			                <h5><span className="glyphicon glyphicon-remove-circle"></span> Cancel Moon Membership</h5>
			            </button>
		            </div>
				</div>
			)
		}
	}
	render(){
		if(!this.props.profile){
			return<div></div>
		}
		
		return (
			<div className="container-fluid bg-3 text-left">
				<div className="col-md-6 col-md-offset-6">
					<h2>User Finance</h2>
					{this.ifCard()}
					<br/>
					<br/>
					<hr/>
					<h3>Moon Membership</h3>
					{this.moon()}
				</div>
			</div>
		)
	}
}

export default createContainer((props)=>{
	console.log(props.pageID)
    Meteor.subscribe('profile');

    return {profile: Profile.findOne({})}

	
}, MemFinance); 



