import React from 'react';
import Header from './main/header';

export default (props) => {
	return(
		<div>
			<div className="my-nav">
				<Header />
			</div>
			{props.children}
		</div>
	)
}