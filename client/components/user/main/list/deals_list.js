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
	renderCards(){
		if(this.props.deals.length == 0){
			return(
				<div>
					<h2>No Special.</h2>
				</div>
			)
		}

		var jjj = this.props.deals;
		jjj.sort(function(a, b) {
		    return parseFloat(a.upvotes.length) - parseFloat(b.upvotes.length);
		});

        return jjj.reverse().map(d=>{

        	return(
        		<div key={d._id}>
        			<DealLi deal={d}/>
        		</div>
        	)
        	
    	})
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




