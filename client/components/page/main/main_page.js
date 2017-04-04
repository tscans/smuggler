import React, {Component} from 'react';
import MakePage from './make_page';
import {browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';
import {Page} from '../../../../imports/collections/page';

class MainPage extends Component {
    pageSheet(){
        var myApp = new Framework7();
        myApp.loginScreen();
    }
    render() {
        if(!this.props.profile){
            return(<div></div>)
        }
        if(this.props.profile.page){
            if(!this.props.page){
                return<div></div>
            }
            setTimeout(function(){ browserHistory.push("/page/deals/") }, 3000);
            $("#mytitle").fadeOut(3000);
            return(
                <div>
                    <h1 id="mytitle">Welcome, {this.props.page.pageName}</h1>
                </div>
            )
        }
        return (
        	<div>
        		<h1>Welcome, Make A Page!</h1>
        		<div className="row">
	        		<div className="col-10"></div>
	        		<div className="col-80">
	        			<p>If you own or represent a business you can sign that business up with the Emerald Arches (McDeal) by clicking this button and following the form.</p>
	        		</div>
	        		<div className="col-10"></div>
        		</div>
        		<div className="my-break-40"></div>
        		<a href="#" className="button button-big" onClick={this.pageSheet.bind(this)}>MAKE A PAGE</a>
                <div className="login-screen">
                   <MakePage />
                </div>
        	</div>
        );
    }
}

export default createContainer((props)=>{
    Meteor.subscribe("profile");
    Meteor.subscribe("ownPage");

    return {profile: Profile.findOne({}), page: Page.findOne({})}

    
}, MainPage);  