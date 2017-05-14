import React from 'react';
import Header from './header';
import {createContainer} from 'meteor/react-meteor-data';
import {Game} from '../../../../imports/collections/game';
import {browserHistory} from 'react-router';
import SubHeader from './sub_header';
import Footer from './footer';
import Profile from './profile';
import Market from './market';

class MainActive extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			pro: true
		}
	}
	switchTabs(b){
		this.setState({pro: b});
	}
	renderBody(){
		var ms = {
			overflow: "scroll",
			height: "75vh"
		}
		
		if(this.state.pro){
			return(
				<Profile game={this.props.game}/>
			)
		}
		else{
			return(
				<div style={ms}>
					
					<Market game={this.props.game} />
					
				</div>
			)
		}	
	}
	render(){
		if(!this.props.game){
			return(
				<div>
					...Loading
				</div>
			)
		}
		var bunt = {
			marginTop: "15vh"
		}
		console.log(this.props.game)
		return(
			<div>
				<Header game={this.props.game} gameID={this.props.params.gameID}/>
				<SubHeader game={this.props.game} />
				<div style={bunt}>
					{this.renderBody()}
				</div>
				<Footer pro={this.state.pro} switchTabs={this.switchTabs.bind(this)}/>
			</div>
		)
	}
}

export default createContainer((props)=>{
    Meteor.subscribe("oneGame",props.params.gameID);

    return {game: Game.findOne({})}

    
}, MainActive);