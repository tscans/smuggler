import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import DealsList from './list/deals_list';
import PagesList from './list/pages_list';

class UserList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dealsList: true
		}
	}
	renderListView(){
		if(this.state.dealsList){
			return(
				<div className="my-card-container">
					<div style={{backgroundColor: "gold"}}>Local Deals</div>
					<div className="my-push-down-10">
						<DealsList deals={this.props.deals} profile={this.props.profile}/>
					</div>
				</div>
			)
		}
		else{
			return(
				<div className="my-card-container">
					<div style={{backgroundColor: "gold"}}>Local Pages</div>
					<div className="my-push-down-10">
						<PagesList pages={this.props.pages} profile={this.props.profile}/>
					</div>
				</div>
			)
		}
	}
	changeListView(){
		this.setState({dealsList: !this.state.dealsList});
	}
    render() {
    	if(!this.props.deals){
    		return(
    			<div>
    				No Deals Found
    			</div>
    		)
    	}
    	console.log(this.props.deals)
        return (
        	<div>
				{this.renderListView()}
				<a href="#" className="floating-button color-yellow my-float-up" onClick={this.changeListView.bind(this)}>
				    <i className="fa fa-list-alt" aria-hidden="true"></i>
				</a>
			</div>
        );
    }
}

export default UserList;








