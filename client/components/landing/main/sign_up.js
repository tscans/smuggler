import React from 'react';

class SignUp extends React.Component{
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
	signUp(event){
		event.preventDefault();

		if(this.state.loader){

			return;
		}
		this.setState({loader: true});
		var ema = this.refs.email.value.trim();
        var pss1 = this.refs.pass.value.trim();
        var pss2 = this.refs.cpass.value.trim();

        if(pss1 != pss2){
        	console.log('no good');
        	this.setState({loader: false});
        	return;
        }
		Accounts.createUser({
            email: ema,
            password: pss1
        },(error)=>{
            if(error){
                console.log(error.reason)
                this.setState({loader: false});
                return;
            }
        });

        Meteor.loginWithPassword(ema, pss1);
        this.setState({loader: false});
        browserHistory.push("/game/");
	}
	render(){
		return(
			<div>
				<form onSubmit={this.signUp.bind(this)}>
				  <input type="email" ref="email" placeholder="Email"/>
				  <input type="password" ref="pass" placeholder="Password"/>
				  <input type="password" ref="cpass" placeholder="Confirm Password"/>
				  {this.loadButton()}
				</form>
			</div>
		)
	}
}

export default SignUp;