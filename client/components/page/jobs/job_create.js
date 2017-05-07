import React, {Component} from 'react';

class JobCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false
        }
    }
    closeCreate(){
        var myApp = new Framework7();
        myApp.closeModal();
    } 
    makeJob(){
        event.preventDefault();
        this.setState({submitted: true});
        var myApp = new Framework7();

        var data = {
            title: this.refs.title.value.trim(),
            phone: this.refs.phone.value.trim(),
            email: this.refs.email.value.trim(),
            description: this.refs.description.value.trim(),
            requirements: this.refs.requirements.value.trim(),
            benefits: this.refs.benefits.value.trim()
        }
        console.log(data)
        Meteor.call('job.makeJob', data, (error,data)=>{
            if(error){
                console.log(error);
                this.setState({submitted: false});
                var myApp = new Framework7();
                myApp.alert("Job not created","Warning!");
            }
            else{
                console.log(data);
                this.refs.title.value = "";
                this.setState({submitted: false});
                var myApp = new Framework7();
                myApp.closeModal();

            }
        })
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
                    <a href="#" className="button button-fill color-green button-raised my-crunch-btn" onClick={this.makeJob.bind(this)}>Post Job</a> 
                </div>
            )
        }
    }
    render(){
        return (
        	<div>
        		<div className="navbar theme-green my-card-3">
                    <div className="navbar-inner">
                        <div className="right my-left-5"><i onClick={this.closeCreate.bind(this)} className="fa fa-times"></i></div>
                    </div>
                </div>
                <div className="my-card-container">
                    <h2>Create Job</h2>
                    <div className="list-block">
                        <ul>
                          <li className="item-content">
                            <div className="item-inner">
                              <div className="item-input">
                                <input type="text" ref="title" placeholder="Job Title"/>
                              </div>
                            </div>
                          </li>
                          <li className="item-content">
                            <div className="item-inner">
                              <div className="item-input">
                                <input type="text" ref="phone" placeholder="Contact Phone"/>
                              </div>
                            </div>
                          </li>
                          <li className="item-content">
                            <div className="item-inner">
                              <div className="item-input">
                                <input type="text" ref="email" placeholder="Contact Email"/>
                              </div>
                            </div>
                          </li>
                          <li className="item-content">
                            <div className="item-inner">
                              <div className="item-input">
                                <textarea type="text" ref="description" placeholder="Job Description"></textarea>
                              </div>
                            </div>
                          </li>
                          <li className="item-content">
                            <div className="item-inner">
                              <div className="item-input">
                                <textarea type="text" ref="requirements" placeholder="Job Requirements"></textarea>
                              </div>
                            </div>
                          </li>
                          <li className="item-content">
                            <div className="item-inner">
                              <div className="item-input">
                                <textarea type="text" ref="benefits" placeholder="Job Benefits"></textarea>
                              </div>
                            </div>
                          </li>
                        </ul>
                    </div>
                    <div className="my-break-100"></div>
                    {this.submission()}
                </div>
        	</div>
        );
    }
}

export default JobCreate;






