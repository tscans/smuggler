import React from 'react';

class PageReviews extends React.Component{
	renderReviews(){
		if(!this.props.page.selectedMessages){
			return(<div></div>)
		}
		if(this.props.page.selectedMessages.length == 0){
			return<div>This page has no reviews</div>
		}
		return this.props.page.selectedMessages.map(m=>{
			return(
				<div key={m._id}>
					<div className="card">
					    <div className="card-content">
					        <div className="card-content-inner">
					        	<div className="color-gray">
					        		{m.name} - {m.createdAt}
					        	</div>
					        	"{m.message}"
					        </div>
					    </div>
					</div>
				</div>
			)
		})
	}
	render(){
		return(
			<div>
				{this.renderReviews()}
			</div>
		)
	}
}

export default PageReviews;