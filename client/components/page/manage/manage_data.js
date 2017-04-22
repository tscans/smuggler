import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
import {Survey} from '../../../../imports/collections/survey';
import {Question} from '../../../../imports/collections/question';
import {Response} from '../../../../imports/collections/response';

class ManageData extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			newLoad: true
		}
	}
	newChart(qid){
		var question;
		var responses = [];
		for(var i = 0; i < this.props.questions.length; i++){
			if(this.props.questions[i]._id == qid){
				question = this.props.questions[i];
			}
		}
		for(var i = 0; i < this.props.responses.length; i++){
			if(this.props.responses[i].questionID == qid){
				responses.push(this.props.responses[i]);
			}
		}
		google.charts.load('current', {packages: ['corechart']});
		google.charts.setOnLoadCallback(drawBasic);
		
		var five = 0;
		var four = 0;
		var three = 0;
		var two = 0;
		var one = 0;

		for(var i = 0; i < this.props.responses.length; i++){
			if(this.props.responses[i].answerScale == 5){
				five = five + 1;
			}
			else if(this.props.responses[i].answerScale == 4){
				four = four + 1;
			}
			else if(this.props.responses[i].answerScale == 3){
				three = three + 1;
			}
			else if(this.props.responses[i].answerScale == 2){
				two = two + 1;
			}
			else if(this.props.responses[i].answerScale == 1){
				one = one + 1;
			}
		}

		function drawBasic() {
	      var data = google.visualization.arrayToDataTable([
	        ['Satisfaction Level', '',{ role: 'style' }],
	        ['5 - Very Satisfied', five, "#42A5F5"],
	        ['4 - Satisfied', four, "#66BB6A"],
	        ['3 - Somewhat Satisfied', three, "#FFEE58"],
	        ['2 - Unsatisfied', two, "#EF5350"],
	        ['1 - Very Unsatisfied', one, "#7E57C2"]
	      ]);

	      var options = {
	          title: question.title,
	          legend : 'top',
	          slices: {
	            0: { color: "#42A5F5" },
	            1: { color: "#66BB6A" },
	            2: { color: "#7E57C2" },
	            3: { color: "#FFEE58" },
	            4: { color: "#EF5350" },
	          }
	      };

	      var chart = new google.visualization.PieChart(document.getElementById('eh'));

	      chart.draw(data, options);
	    }
	}
	renderQuestions(){
		return this.props.questions.map(q=>{
				if(q.type == "o"){
					return;
				}
				return(
					<div key={q._id}>
						<p className="buttons-row my-crunch-btn">
						  <a onClick={()=>{this.newChart(q._id);this.setState({newLoad: false})}} href="#" className="button button-raised color-green">{q.title}</a>
						</p>
					</div>
				)
			}
		)
	}
	renderLoad(){
		if(this.state.newLoad){
			return(
				<div>
					<h1>Select a Question</h1>
				</div>
			)
		}
	}
	render(){
		if(!this.props.survey || !this.props.questions || !this.props.responses){
			return(
				<div className="my-card-container">
					<div className="navbar theme-white my-card-3">
	                    <div className="navbar-inner">
	                        <div className="left my-left-5">
	                            <a href="#" onClick={()=>{browserHistory.push("/page/manage/")}}>
	                                <i className="fa fa-arrow-left color-green"></i>
	                            </a>
	                        </div>
	                        <div className="my-nav-right color-green">
	                            Survey Data
	                        </div>
	                    </div>
	                </div>
	                ...Loading
				</div>
			)
		}
		var style={width:"100vw", height:"50vh"}
		return(
			<div className="my-card-container">
				<div className="navbar theme-white my-card-3">
                    <div className="navbar-inner">
                        <div className="left my-left-5">
                            <a href="#" onClick={()=>{browserHistory.push("/page/manage/")}}>
                                <i className="fa fa-arrow-left color-green"></i>
                            </a>
                        </div>
                        <div className="my-nav-right color-green">
                            Survey Data
                        </div>
                    </div>
                </div>
                {this.renderLoad()}
                <div id="eh" style={style}></div>
                <div>
                	{this.renderQuestions()}
                </div>
			</div>
		)
	}
}

export default createContainer((props)=>{
    Meteor.subscribe("oneSurvey", props.params.surveyID);
    Meteor.subscribe("surveyQuestions", props.params.surveyID);
    Meteor.subscribe("surveyResponses", props.params.surveyID);

    return {survey: Survey.findOne({}), questions: Question.find({}).fetch(), responses: Response.find({}).fetch()}

	
}, ManageData);



