import React from 'react';
import DealsList from './list/deals_list';
import DealLi from './list/deal_li';
import moment from 'moment';

class BookUser extends React.Component{
	checkMissing(){

		var d = this.props.deals;
		var p = this.props.profile;
		var dids = [];
		for(var i = 0; i < d.length; i++){
			dids.push(d[i]._id);
		}
		function arr_diff (a1, a2) {

		    var a = [], diff = [];

		    for (var i = 0; i < a1.length; i++) {
		        a[a1[i]] = true;
		    }

		    for (var i = 0; i < a2.length; i++) {
		        if (a[a2[i]]) {
		            delete a[a2[i]];
		        } else {
		            a[a2[i]] = true;
		        }
		    }

		    for (var k in a) {
		        diff.push(k);
		    }

		    return diff;
		};
		var toremove = arr_diff(p.book,dids);
		for(var i = 0; i < toremove.length; i++){
			console.log(toremove[i])
			Meteor.call("profile.removeOld", toremove[i], (error,data)=>{
				if(error){
					console.log(error);
				}
				else{
					console.log(data);
				}
			})
		}
		
	}
	renderBook(){
		return this.props.deals.map(d=>{
			var red = false;
			if(d.date == moment(new Date()).add(-1,"day").format("ll")){
				red = true;
			}
			return(
				<div key={d._id}>
					<DealLi deal={d} red={red}/>
				</div>
			)
		})
	}
	render(){
		if(!this.props.deals || !this.props.profile){
			return<div></div>
		}
		this.checkMissing();
		return(
			<div>
				{this.renderBook()}
			</div>
		)
	}
}

export default BookUser; 
