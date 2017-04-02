import React from 'react';
import Navbar from './main/navbar';

export default (props) => {
	return(
		<div>
			<Navbar />
			{props.children}
		</div>
	)
}