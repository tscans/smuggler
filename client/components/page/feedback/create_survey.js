import React from 'react';

class CreateSurvey extends React.Component{
	render(){
		return(
			<div>
				<div className="navbar theme-green my-card-3">
                    <div className="navbar-inner">
                        <div className="right my-left-5">
                        	<a href="#" className="close-popup">
                        		<i className="fa fa-times color-white"></i>
                        	</a>
                        </div>
                        Create Survey
                    </div>
                </div>
                <div className="content-block">
					create survey
				</div>
			</div>
		)
	}
}

export default CreateSurvey;