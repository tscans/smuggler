import React from 'react';
import {browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {Survey} from '../../../../imports/collections/survey';
import {Page} from '../../../../imports/collections/page';
import {Question} from '../../../../imports/collections/question';

class CreateSurvey extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            changesMade:true,
            deleteQuestions: false
        }
    }
    addQuestions(type){
        var myApp = new Framework7();
        var data = {
            type: type,
            surveyID: this.props.params.surveyID
        }
        console.log(data)
        Meteor.call("question.makeQuestion", data, (error,data)=>{
            if(error){
                console.log(error);
                myApp.alert(error.message, "Warning!");
            }
            else{
                console.log(data);
            }
        })
    }
    saveData(){
        var data = {
            sid: this.props.params.surveyID,
            surveyName: this.refs.name.value.trim(),
            surveyDetails: this.refs.details.value.trim()
        }
        Meteor.call("survey.editSurvey", data, (error,data)=>{
            if(error){
                console.log(error);
                return;
            }
            else{
                console.log(data);
            }
        })
        var i = 0;
        this.props.questions.map(q=>{
            i = i + 1;
            var data = {
                qid: q._id,
                title: document.getElementById(('q'+i.toString())).value
            }
            Meteor.call("question.updateQuestion", data, (error,data)=>{
                if(error){
                    console.log(error);
                }
                else{
                    console.log(data);
                }
            })
        })
        this.setState({changesMade: false});
        console.log('save successful')
        
    }
    renderDelete(qid){
        if(this.state.deleteQuestions){
            return(
                <div className="my-delete-button go-fucking-center" onClick={()=>{this.deleteQuestion(qid)}}>
                    <b><h3 className="ic-red"><a href="#" className="button button-fill color-red">Delete</a></h3></b>
                </div>
            )
        }
        
    }
    listQuestions(){
        var i = 0;
        return this.props.questions.map(q=>{
            i = i + 1;
            if(q.type == "o"){
                return(
                    <div key={Math.random()}>
                        <div className="item-content">
                            <div className="item-inner">
                              <div className="item-input my-input-5">
                                <input type="text" placeholder={"Question " + i} id={"q"+i} defaultValue={q.title}/>
                              </div>
                            </div>
                        </div>
                        <div className="item-content">
                            <div className="item-inner">
                              <div className="item-input my-input-5">
                                <input type="text" placeholder="(User Response)" disabled/>
                              </div>
                            </div>
                        </div>
                        {this.renderDelete(q._id)}
                        <div className="my-question-buffer"></div>
                    </div>
                )
            }
            else if(q.type == "s"){
                return(
                    <div key={Math.random()}>
                        <div className="item-content">
                            <div className="item-inner">
                              <div className="item-input my-input-5">
                                <input type="text" placeholder={"Question " + i} id={"q"+i} defaultValue={q.title}/>
                              </div>
                            </div>
                        </div>
                        <div>
                            <p className="buttons-row">
                              <a href="#" className="button color-green" onClick={()=>{this.buttonSelect()}}>Satisfaction Level</a>
                            </p>
                        </div>
                        {this.renderDelete(q._id)}
                        <div className="my-question-buffer"></div>
                    </div>
                )
            }
        });
    }
    buttonSelect(){
        var myApp = new Framework7();
        var buttons1 = [
            {
                text: 'Satisfaction Level',
                label: true
            },
            {
                text: '5 - Very Satisfied',
                bold: true
            },
            {
                text: '4 - Satisfied',
                bold: true
            },
            {
                text: '3 - Somewhat Satisfied',
                bold: true
            },
            {
                text: '2 - Unsatisfied',
                bold: true
            },
            {
                text: '1 - Very Unsatisfied',
                bold: true
            },
        ];
        var buttons2 = [
            {
                text: 'Cancel',
                color: 'red'
            }
        ];
        var groups = [buttons1, buttons2];
        myApp.actions(groups);

    }
    deleteQuestion(qid){
        Meteor.call("question.deleteQuestion", qid, (error,data)=>{
            if(error){
                console.log(error);
            }
            else{
                console.log(data);
            }
        })
    }
    deleteSwitch(){
        this.setState({deleteQuestions: !this.state.deleteQuestions});
    }
    goBack(){
        if(this.state.changesMade){
            var myApp = new Framework7();
            myApp.confirm("Leave Without Saving?", function () {

                myApp.alert('Changes Discarded','OK');
                browserHistory.push("/page/feedback/")
            })
        }
        else{
            browserHistory.push("/page/feedback/")
        }
        
    }
    handlePublish(){
        Meteor.call("survey.handlePublish", this.props.params.surveyID, (error,data)=>{
            if(error){
                console.log(error);
            }
            else{
                console.log(data);
            }
        })
    }
    publishButton(){
        if(this.props.survey.published){
            return(
                <p className="buttons-row my-crunch-btn">
                  <a href="#" className="button button-fill color-green" onClick={this.handlePublish.bind(this)}>Published <i className="fa fa-check-circle" aria-hidden="true"></i></a>
                </p>
            )
        }
        else{
            return(
                <p className="buttons-row my-crunch-btn">
                  <a href="#" className="button button-fill color-red" onClick={this.handlePublish.bind(this)}>Not Published</a>
                </p>
            )
        }
    }
	render(){
        if(!this.props.survey){
            return(
                <div>
                    <div className="navbar theme-white my-card-3">
                    <div className="navbar-inner">
                        <div className="left my-left-5">
                            <a href="#" onClick={()=>{browserHistory.push("/page/feedback/")}}>
                                <i className="fa fa-arrow-left color-green"></i>
                            </a>
                        </div>
                        <div className="my-nav-right color-green">
                            Survey
                        </div>
                    </div>
                </div>
                    <div className="content-block">
                    ...Loading
                    </div>
                </div>
            )
        }
		return(
			<div className="my-card-container">
				<div className="navbar theme-white my-card-3">
                    <div className="navbar-inner">
                        <div className="left my-left-5">
                        	<a href="#" onClick={()=>{this.goBack()}}>
                        		<i className="fa fa-arrow-left color-green"></i>
                        	</a>
                        </div>
                        <div className="my-nav-right color-green">
                            Survey
                        </div>
                    </div>
                </div>
                <div className="content-block">
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-input">
                        <input type="text" placeholder="Survey Name" ref="name" defaultValue={this.props.survey.surveyName}/>
                      </div>
                    </div>
                  </div>
                  <br/>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-input">
                        <input type="text" placeholder="Survey Details" ref="details" defaultValue={this.props.survey.surveyDetails}/>
                      </div>
                    </div>
                  </div>
				</div>
                <p>Add Question</p>
                <p className="buttons-row my-btn-5">
                  <a href="#" className="button button-fill color-green" onClick={()=>{this.addQuestions('s')}}>Satisfaction</a>
                  <a href="#" className="button button-fill color-green" onClick={()=>{this.addQuestions('o')}}>Free Answer</a>
                </p>
                <p>Questions</p>
                {this.listQuestions()}
                <div className="my-title-buffer"></div>
                {this.publishButton()}
                <a href="#" className="floating-button color-blue" onClick={this.saveData.bind(this)}>
                    <i className="fa fa-floppy-o"></i>
                </a>
                <a href="#" className="floating-button color-red my-floating-btn-left" onClick={this.deleteSwitch.bind(this)}>
                    <i className="fa fa-question"></i>
                    <i className="fa fa-arrow-right"></i>
                    <i className="fa fa-trash"></i>
                </a>
			</div>
		)
	}
}

export default createContainer((props)=>{
    Meteor.subscribe("ownPage");
    Meteor.subscribe("oneSurvey", props.params.surveyID);
    console.log(props.params.surveyID)
    Meteor.subscribe("surveyQuestions",props.params.surveyID);

    return {page: Page.findOne({}), survey: Survey.findOne({}), questions: Question.find({}).fetch()}

    
}, CreateSurvey);  






