import React, {Component} from 'react';
import {browserHistory} from 'react-router';
var zipcodes = require('zipcodes');
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';
import {Page} from '../../../../imports/collections/page';
import UpdateImage from './update_image';

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            latlong: null
        }
    }
    buttonPlace(){
        if(!this.state.loading){
            return(
              <li onClick={this.updatePage.bind(this)}>
                <a href="#" className="item-link color-green list-button">Update Page</a>
              </li>
            )
        }
        else{
            return(
                <img src="/ring.gif" height="50px"/>
            )
        }
    }
    updatePage(event){
        event.preventDefault();
        this.setState({loading: true});
        var myApp = new Framework7();

        var busname = this.refs.busname.value.trim();
        var email = this.refs.email.value.trim();
        var name = this.refs.name.value.trim();
        var address = this.refs.address.value.trim();
        var phone = this.refs.phone.value.trim();
        var website = this.refs.website.value.trim();
        var about = this.refs.about.value.trim();
        
        var data = {
            address: address,
            pageName: busname,
            email: email,
            ownerName: name,
            about: about,
            phone: phone,
            website: website
        }
        var oldData = this.props.page;
        
        if(busname == "" || email == "" || name == "" || address == "" || phone == "" || about == ""){
            myApp.alert('Please complete necessary fields','Warning!');
            console.log("enter data");
            this.setState({loading: false});
            return;
        }
        var myError = false;
        if(data.pageName != oldData.pageName){
        	Meteor.call('page.updatePageName', data.pageName, (error, data)=> {
	            if(error){myError = true}
	        })  
        }
        if(data.email != oldData.email){
        	Meteor.call('page.updateEmail', data.email, (error, data)=> {
	            if(error){myError = true}
	        })  
        }
        if(data.ownerName != oldData.ownerName){
        	Meteor.call('page.updateOwnerName', data.ownerName, (error, data)=> {
	            if(error){myError = true}
	        })  
        }
        if(data.address != oldData.address){
        	Meteor.call('page.updateAddress', data.address, (error, data)=> {
	            if(error){myError = true}
	        })  
        }
        if(data.phone != oldData.phone){
        	Meteor.call('page.updatePhone', data, (error, data)=> {
	            if(error){myError = true}
	        })  
        }
        if(data.website != oldData.website){
        	Meteor.call('page.updateWebsite', data.website, (error, data)=> {
	            if(error){myError = true}
	        })  
        }
        if(data.about != oldData.about){
        	Meteor.call('page.updateAbout', data.about, (error, data)=> {
	            if(error){myError = true}
	        })  
        }
        
        if(myError){
            var myApp = new Framework7();
            myApp.alert(error.reason, `Warning!`);
            console.log("There was an error");
            console.log(error);
            this.setState({loading: false});
        }
        else{
            console.log(data)
            
            var myApp = new Framework7();
            this.setState({loading: false});
            myApp.alert(`Saved!`, `Thanks!`);
            
        }

    }
    openModal(){
    	var myApp = new Framework7();
    	myApp.popup('.popup-about');
    }
    render() {
        console.log(this.props.profile, this.props.page)
        if(!this.props.page){
        	return<div></div>
        }
        return (
            <div>
                <form>
                <h2>Update Info</h2>
                <p>* is optional</p>
                  <div className="list-block">
                    <ul>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">Business Name</div>
                          <div className="item-input">
                            <input type="text" ref="busname" placeholder="Business Name" defaultValue={this.props.page.pageName}/>
                          </div>
                          
                        </div>
                      </li>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">Business Email</div>
                          <div className="item-input">
                            <input type="email" ref="email" placeholder="Business Email" defaultValue={this.props.page.email}/>
                          </div>
                          
                        </div>
                      </li>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">Owner Name</div>
                          <div className="item-input">
                            <input type="text" ref="name" placeholder="Owner Name" defaultValue={this.props.page.ownerName}/>
                          </div>
                          
                        </div>
                      </li>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">Address</div>
                          <div className="item-input">
                            <input type="text" ref="address" placeholder="Address" defaultValue={this.props.page.address}/>
                          </div>
                          
                        </div>
                      </li>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">Phone</div>
                          <div className="item-input">
                            <input type="text" ref="phone" placeholder="Phone" defaultValue={this.props.page.phone}/>
                          </div>
                          
                        </div>
                      </li>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">*Website</div>
                          <div className="item-input">
                            <input type="text" ref="website" placeholder="Website" defaultValue={this.props.page.website}/>
                          </div>
                          
                        </div>
                      </li>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">About</div>
                          <div className="item-input">
                              <textarea ref="about" placeholder="About (25 char min)" defaultValue={this.props.page.about}></textarea>
                          </div>
                        </div>
                      </li>
                      <li onClick={this.openModal.bind(this)}>
                      	<a href="#" className="item-link color-black list-button">Update Image</a>
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
                <div className="popup popup-about">
				    <UpdateImage/>
				</div>
                <div id="latlong-dom"></div>
            </div>
        );
    }
}

export default createContainer((props)=>{
    Meteor.subscribe("profile");
    Meteor.subscribe("ownPage");

    return {profile: Profile.findOne({}), page: Page.findOne({})}

    
}, Update);  
