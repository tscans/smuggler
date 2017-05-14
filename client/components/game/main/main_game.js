import React from 'react';
import GameList from './game_list';
import {browserHistory} from 'react-router';
import Header from './header';

class MainGame extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			weeks: 30
		}
	}
	gameModal(){
		var black = {color: "black"};
		return(
			<div>
				<div id="gameModal" className="modal">
				  <header className="bar bar-nav">
				    <a className="btn pull-right" href="#gameModal">Close</a>
				    <h1 className="title">Create New Game</h1>
				  </header>

				  <div className="content">
				    <div className="content-padded">
				    	<h3>What's your name captain?</h3>
				    	<input type="text" ref="captain" style={black} placeholder="e.g. Solo" />
				    	<div className="segmented-control">
						  <a className="control-item active" href="#item1mobile" onClick={()=>{this.setState({weeks: 30})}}>
						    30 Weeks
						  </a>
						  <a className="control-item" href="#item2mobile" onClick={()=>{this.setState({weeks: 60})}}>
						    60 Weeks
						  </a>
						  <a className="control-item" href="#item3mobile" onClick={()=>{this.setState({weeks: 90})}}>
						    90 Weeks
						  </a>
						</div>
						<button className="btn btn-block" onClick={this.newGame.bind(this)}>Create Game</button>
				    </div>
				  </div>
				</div>
			</div>
		)
	}
	openModal(){
		$("#gameModal").addClass('active');
	}
	closeModal(){
		$("#gameModal").removeClass('active');
	}
	newGame(){
		var data = {
			gameName: this.refs.captain.value.trim(),
			periods: this.state.weeks
		}
		Meteor.call("game.create", data,(error,data)=>{
			if(error){
				console.log(error);
			}
			else{
				console.log(data);
				this.closeModal();
				browserHistory.push("/game/"+data+"/")
			}
		})
	}
	render(){
		var mainStyle = {
			textAlign: "center"
		}
		return(
			<div style={mainStyle}>
				<div className="my-nav">
					<Header />
				</div>
				{this.gameModal()}
				<h2>Current Games</h2>
				<GameList />
				<button className="btn btn-block" onClick={this.openModal.bind(this)} >New Game</button>
			</div>
		)
	}
}

export default MainGame;