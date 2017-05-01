import React, {Component} from 'react';
import {browserHistory} from 'react-router';
var zipcodes = require('zipcodes');
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../../imports/collections/profile';
import {Page} from '../../../../imports/collections/page';

class MakePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            latlong: null
        }
    }
    closeModal(){
        var myApp = new Framework7();
        myApp.closeModal();
    }
    buttonPlace(){
        if(!this.state.loading){
            return(
              <li onClick={this.makePage.bind(this)}>
                <a href="#" className="item-link color-green list-button">Make Page</a>
              </li>
            )
        }
        else{
            return(
                <img src="/ring.gif" height="50px"/>
            )
        }
    }
    makePage(event){
        event.preventDefault();
        this.setState({loading: true});
        var myApp = new Framework7();

        var busname = this.refs.busname.value.trim();
        var email = this.refs.email.value.trim();
        var name = this.refs.name.value.trim();
        var address = this.refs.address.value.trim();
        var city = this.refs.city.value.trim();
        var state = this.refs.state.value.trim();
        var phone = this.refs.phone.value.trim();
        var website = this.refs.website.value.trim();
        var about = this.refs.about.value.trim();
        
        var data = {
            address: address + " " + city + " " + state,
            pageName: busname,
            email: email,
            ownerName: name,
            about: about,
            phone: phone,
            website: website
        }
        
        if(busname == "" || email == "" || name == "" || address == "" || phone == "" || about == ""){
            myApp.alert('Please complete necessary fields','Warning!');
            console.log("enter data");
            this.setState({loading: false});
            return;
        }

        Meteor.call('page.makePage', data, (error, data)=> {
            if(error){
                var myApp = new Framework7();
                myApp.alert(error.reason, `Warning!`);
                console.log("There was an error");
                console.log(error);
                this.setState({loading: false});
            }
            else{
                console.log(data)
                this.refs.busname.value = "";
                this.refs.email.value = "";
                this.refs.name.value = "";
                this.refs.address.value = "";
                this.refs.phone.value = "";
                this.refs.website.value = "";
                this.refs.about.value = "";
                
                var myApp = new Framework7();
                this.setState({loading: false});
                myApp.closeModal();
                myApp.alert(`Success! Your page has been made.`, `Thanks!`);
                if(this.props.profile.businessCard){
                  browserHistory.push("/page/deals/")
                }
                else{
                  browserHistory.push('/page/verify/');
                
                  myApp.alert(`Please verify your page by completing the following.`, `One Last Thing!`);
                }
                
                
            }
            
        })  

    }
    render() {
        console.log(this.props.profile, this.props.page)
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
                <h2>Make Page</h2>
                <p>* required</p>
                  <div className="list-block">
                    <ul>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">*Business Name</div>
                          <div className="item-input">
                            <input type="text" ref="busname" placeholder="Business Name"/>
                          </div>
                          
                        </div>
                      </li>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">*Business Email</div>
                          <div className="item-input">
                            <input type="email" ref="email" placeholder="Business Email"/>
                          </div>
                          
                        </div>
                      </li>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">*Owner Name</div>
                          <div className="item-input">
                            <input type="text" ref="name" placeholder="Owner Name"/>
                          </div>
                          
                        </div>
                      </li>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">*Address</div>
                          <div className="item-input">
                            <input type="text" ref="address" placeholder="Address"/>
                          </div>
                          
                        </div>
                      </li>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">*City</div>
                          <div className="item-input">
                            <input type="text" ref="city" placeholder="City"/>
                          </div>
                          
                        </div>
                      </li>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">*State</div>
                          <div className="item-input">
                            <input type="text" ref="state" placeholder="State"/>
                          </div>
                          
                        </div>
                      </li>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">*Phone</div>
                          <div className="item-input">
                            <input type="text" ref="phone" placeholder="Phone"/>
                          </div>
                          
                        </div>
                      </li>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">Website</div>
                          <div className="item-input">
                            <input type="text" ref="website" placeholder="Website"/>
                          </div>
                          
                        </div>
                      </li>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">*About</div>
                          <div className="item-input">
                              <textarea ref="about" placeholder="About (25 char min)"></textarea>
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
                <div id="latlong-dom"></div>
            </div>
        );
    }
}

export default createContainer((props)=>{
    Meteor.subscribe("profile");
    Meteor.subscribe("ownPage");

    return {profile: Profile.findOne({}), page: Page.findOne({})}

    
}, MakePage);  
