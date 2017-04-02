import React from 'react';
import Navbar from './main/navbar';
import Footer from './main/footer';

export default (props) => {
	return(
		<div>
			<div className="my-header">
				<Navbar />
			</div>
				{props.children}
			<div className="my-footer">
				<Footer />	
			</div>
		</div>
	)
}