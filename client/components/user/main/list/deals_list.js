import React from 'react';
import moment from 'moment';
import DealLi from './deal_li';

class DealsList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			dayPoint: 0
		}
	}
	renderToday(){
		var jjj = this.props.deals;
		jjj.sort(function(b,a) {
		    return parseFloat(a.upvotes.length) - parseFloat(b.upvotes.length);
		});
		var d = new Date();
		var today = moment(d).format("ll");
		var tomorrow = moment(d).add(1,"day").format("ll");
		var twotomorrow = moment(d).add(2,"day").format("ll");
		var iii = [];
		for(var i = 0; i < jjj.length;i++){
			if(jjj[i].date == today){
				iii.push(jjj[i]);
			}
		}
        return iii.map(d=>{
        	return(
        		<div key={d._id}>
        			<DealLi deal={d}/>
        		</div>
        	)
    	})
	}
	renderTomorrow(){
		var jjj = this.props.deals;
		jjj.sort(function(b,a) {
		    return parseFloat(a.upvotes.length) - parseFloat(b.upvotes.length);
		});
		var d = new Date();
		var tomorrow = moment(d).add(1,"day").format("ll");
		var iii = [];
		for(var i = 0; i < jjj.length;i++){
			if(jjj[i].date == tomorrow){
				iii.push(jjj[i]);
			}
		}
        return iii.map(d=>{
        	return(
        		<div key={d._id}>
        			<DealLi deal={d}/>
        		</div>
        	)
    	})
	}
	renderTwoTomorrow(){
		var jjj = this.props.deals;
		jjj.sort(function(b,a) {
		    return parseFloat(a.upvotes.length) - parseFloat(b.upvotes.length);
		});
		var d = new Date();
		var twotomorrow = moment(d).add(2,"day").format("ll");
		var iii = [];
		for(var i = 0; i < jjj.length;i++){
			if(jjj[i].date == twotomorrow){
				iii.push(jjj[i]);
			}
		}
        return iii.map(d=>{
        	return(
        		<div key={d._id}>
        			<DealLi deal={d}/>
        		</div>
        	)
    	})
	}
	renderDateArrows(){
		var large = {
			fontSize: "20px"
		}
		if(this.state.dayPoint == 0){
			return(
				<div>
					<p className="color-green" style={large}> Today <i className="fa fa-arrow-right" aria-hidden="true" onClick={()=>{this.setState({dayPoint: this.state.dayPoint+1})}}></i></p>
				</div>
			)
		}
		else if(this.state.dayPoint == 1){
			return(
				<div>
					<p className="color-green" style={large}><i className="fa fa-arrow-left" aria-hidden="true" onClick={()=>{this.setState({dayPoint: this.state.dayPoint-1})}}></i> Tomorrow <i className="fa fa-arrow-right" aria-hidden="true" onClick={()=>{this.setState({dayPoint: this.state.dayPoint+1})}}></i></p>
				</div>
			)
		}
		else{
			return(
				<div>
					<p className="color-green" style={large}><i className="fa fa-arrow-left" aria-hidden="true" onClick={()=>{this.setState({dayPoint: this.state.dayPoint-1})}}></i> {moment(new Date()).add(2,"day").format("ll")} </p>
				</div>
			)
		}
	}
	renderCards(){
		if(this.props.deals.length == 0){
			return(
				<div>
					<h2>No Specials.</h2>
				</div>
			)
		}
		if(this.state.dayPoint == 0){
			return(
				<div>
					{this.renderDateArrows()}
					{this.renderToday()}
				</div>
			)
		}
		else if(this.state.dayPoint == 1){
			return(
				<div>
					{this.renderDateArrows()}
					{this.renderTomorrow()}
				</div>
			)
		}
		else{
			return(
				<div>
					{this.renderDateArrows()}
					{this.renderTwoTomorrow()}
				</div>
			)
		}
	}
	render(){
		if(!this.props.deals || !this.props.profile){
			return(
				<div>
					<img src="/ring.gif" />
				</div>
			)
		}
		return(
			<div>
				<div>
					<div className="go-fucking-center">
						{this.renderCards()}
					</div>
				</div>
			</div>
		)
	}
}

export default DealsList; 




