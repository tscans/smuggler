import React from 'react';
import {browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {Survey} from '../../../../imports/collections/survey';
import {Question} from '../../../../imports/collections/question';

class SurveyUser extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			responses: [],
			qid: null
		}
	}
	renderQuestions(){
		if(this.props.questions.length == 0){
			return(
				<div>
					Odd... No questions in this survey
				</div>
			)
		}
		var i = 0;
		return this.props.questions.map(q=>{
			i = i + 1;
            if(q.type == "o"){
                return(
                    <div key={q._id}>
                        <div className="item-content">
                            <div className="item-inner">
                            	<div>{q.title}</div>
                            </div>
                        </div>
                        <div className="item-content">
                            <div className="item-inner">
                              <div className="item-input my-input-5">
                                <input type="text" placeholder="Response" id={"q"+q._id}/>
                              </div>
                            </div>
                        </div>
                        <div className="my-question-buffer"></div>
                    </div>
                )
            }
            else if(q.type == "s"){
            	var saying = "Choose Satisfaction";
            	for(var i = 0; i < this.state.responses.length; i++){
					if(this.state.responses[i].qid == q._id){
						saying = "Satisfaction - "+this.state.responses[i].answer.toString();
					}
				}
                return(
                    <div key={q._id}>
                        <div className="item-content">
                            <div className="item-inner">
                            	<div>{q.title}</div>
                            </div>
                        </div>
                        <div>
                            <p className="buttons-row my-crunch-btn">
                              <a href="#" className="button button-raised color-green" onClick={()=>{this.pickSat(q._id);this.setState({qid: q._id})}}>{saying}</a>
                            </p>
                        </div>
                        <div className="my-question-buffer"></div>
                    </div>
                )
            }
		})
	}
	clickPicker(answer){
		var myApp = new Framework7();
		myApp.closeModal('.picker-info')
		for(var i = 0; i < this.state.responses.length; i++){
			if(this.state.responses[i].qid == this.state.qid){
				console.log('innnnner');
				var newArray = this.state.responses.slice();    
			    newArray.splice(i,1);  
				var qid = this.state.qid;
				var type = "s";
			    newArray.push({
			    	qid: qid,
			    	answer: answer,
			    	type: type
			    });   
			    this.setState({responses:newArray})
			    return;
			}
		}
		var newArray = this.state.responses.slice();    
		var qid = this.state.qid;
		var type = "s";
	    newArray.push({
	    	qid: qid,
	    	answer: answer,
	    	type: type
	    });   
	    this.setState({responses:newArray})
	}
	closePicker(){
		var myApp = new Framework7();
		myApp.closeModal('.picker-info');
		console.log(this.state.responses);
	}
	renderPicker(){
		return(
			<div>
				<div className="picker-modal picker-info">
				    <div className="picker-modal-inner">
				      <div className="content-block">
				        <h3 onClick={()=>{this.clickPicker(5)}}>5 - Very Satisfied</h3>
				        <h3 onClick={()=>{this.clickPicker(4)}}>4 - Satisfied</h3>
				        <h3 onClick={()=>{this.clickPicker(3)}}>3 - Somewhat Satisfied</h3>
				        <h3 onClick={()=>{this.clickPicker(2)}}>2 - Unsatisfied</h3>
				        <h3 onClick={()=>{this.clickPicker(1)}}>1 - Very Unsatisfied</h3>
				        <h3 className="ic-red" onClick={()=>{this.closePicker()}}>Cancel</h3>
				      </div>
				    </div>
				</div>
			</div>
		)
	}
	pickSat(qid){
        var myApp = new Framework7();
        myApp.pickerModal('.picker-info')
    }
    submit(){
    	var myApp = new Framework7();
    	var newArray = this.state.responses.slice();
    	for(var i = 0; i < this.props.questions.length; i++){
    		if(document.getElementById("q"+this.props.questions[i]._id)){
    			if(document.getElementById("q"+this.props.questions[i]._id).value != ""){
    				newArray.push({
		    			qid: this.props.questions[i]._id,
				    	answer: document.getElementById("q"+this.props.questions[i]._id).value,
				    	type: "o"
		    		})
    			}
    		}
    	}
    	console.log(newArray)
    	if(newArray.length < this.props.questions.length){
    		var myApp = new Framework7();
    		myApp.alert('Please answer every question!','Warning!');
    		return;
    	}
    	Meteor.call("response.submitSurvey", this.props.params.pageID, this.props.params.surveyID, newArray, (error,data)=>{
    		if(error){
    			console.log(error);
    		}
    		else{
    			console.log(data);
    			browserHistory.push("/user/feedback/"+this.props.params.pageID+"/");
    			myApp.alert("Thank you for submitting the survey.", "Success!");
    		}
    	})
    	
    }
	render(){
		if(!this.props.survey || !this.props.questions){
			console.log(this.props)
			return(
				<div>
					<div className="navbar theme-white my-card-3">
	                    <div className="navbar-inner">
	                        <div className="left my-left-5">
	                        	<a href="#" onClick={()=>{browserHistory.push("/user/feedback/"+this.props.params.pageID+"/")}}>
	                        		<i className="fa fa-arrow-left color-green"></i>
	                        	</a>
	                        </div>
	                        <div className="my-nav-right color-green">
	                            Survey
	                        </div>
	                    </div>
	                </div>
                ...Loading
                </div>
			)
		}
		return(
			<div className="my-card-container">
				{this.renderPicker()}
				<div className="navbar theme-white my-card-3">
                    <div className="navbar-inner">
                        <div className="left my-left-5">
                        	<a href="#" onClick={()=>{browserHistory.push("/user/feedback/"+this.props.params.pageID+"/")}}>
                        		<i className="fa fa-arrow-left color-green"></i>
                        	</a>
                        </div>
                        <div className="my-nav-right color-green">
                            Survey
                        </div>
                    </div>
                </div>
                <h2>{this.props.survey.surveyName}</h2>
                {this.renderQuestions()}
                <p className="buttons-row my-title-buffer">
                  <a href="#" className="button button-fill color-green" onClick={this.submit.bind(this)}>Submit Survey</a>
                </p>
			</div>
		)
	}
}

export default createContainer((props)=>{
    Meteor.subscribe("oneSurveyUser", props.params.surveyID);
    Meteor.subscribe("surveyQuestions", props.params.surveyID);

    return {survey: Survey.findOne({}), questions: Question.find({}).fetch()}

	
}, SurveyUser);

