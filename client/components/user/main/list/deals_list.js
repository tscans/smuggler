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
		var iii = [];
		for(var i = 0; i < jjj.length;i++){
			if(jjj[i].date == today){
				iii.push(jjj[i]);
			}
		}
        return iii.map(d=>{
        	return(
        		<div key={d._id}>
        			<DealLi deal={d} getDeal={this.props.getDeal}/>
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
        			<DealLi deal={d} getDeal={this.props.getDeal}/>
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
					<p className="buttons-row my-btn-5 color-green">
					  <a href="#" className="button button-raised button-fill color-green" onClick={()=>{this.setState({dayPoint: 0})}}>Today</a>
					  <a href="#" className="button" onClick={()=>{this.setState({dayPoint: 1})}}>Tomorrow</a>
					</p>   
				</div>
			)
		}
		else if(this.state.dayPoint == 1){
			return(
				<div>
					<p className="buttons-row my-btn-5 color-green">
					  <a href="#" className="button" onClick={()=>{this.setState({dayPoint: 0})}}>Today</a>
					  <a href="#" className="button button-raised button-fill color-green" onClick={()=>{this.setState({dayPoint: 1})}}>Tomorrow</a>
					</p>   
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
	}
	giveDeal(d){
		this.props.getDeal(d);
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




