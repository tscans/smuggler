import React from 'react';
import DealModal from './deal_modal';
import moment from 'moment';
import DealLi from './deal_li';

class DealsList extends React.Component{
	openModal(d){
		this.setState({deal: d});
		var myApp = new Framework7();

		myApp.popup('.popup-about');

	}
	renderModal(){
		if(true){
			return(
				<DealModal deal={this.state.deal}/>
			)
		}
	}
	renderModalButton(d){
		if(true){
			return(
				<div>
					<p className="buttons-row" onClick={()=>{this.openModal(d)}}>
					  <a href="#" className="button button-raised">Show Special</a>
					</p>  
				</div>
			)
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
	renderCards(){
		if(this.props.deals.length == 0){
			return(
				<div>
					<h2>No Specials.</h2>
				</div>
			)
		}
		return(
			<div>
				{<p>Today</p>}
				{this.renderToday()}
				<p>Tomorrow</p>
				{this.renderTomorrow()}
				<p>{moment(new Date()).add(2,"day").format("ll")}</p>
				{this.renderTwoTomorrow()}
			</div>
		)
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




