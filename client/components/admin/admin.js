import React from 'react';
import Navbar from './nav/navbar';

export default (props) => {
	return(
		<div>
			<Navbar/>
			{props.children}
		</div>
	)
}