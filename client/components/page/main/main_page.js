import React, {Component} from 'react';
import MakePage from './make_page';

class MainPage extends Component {
    pageSheet(){
        var myApp = new Framework7();
        myApp.loginScreen();
    }
    render() {
        return (
        	<div>
        		<h1>Welcome, Make A Page!</h1>
        		<div className="row">
	        		<div className="col-10"></div>
	        		<div className="col-80">
	        			<p>If you own or represent a business you can sign that business up with the Emerald Arches (McDeal) by clicking this button and following the form.</p>
	        		</div>
	        		<div className="col-10"></div>
        		</div>
        		<div className="my-break-40"></div>
        		<a href="#" className="button button-big" onClick={this.pageSheet.bind(this)}>MAKE A PAGE</a>
                <div className="login-screen">
                   <MakePage />
                </div>
        	</div>
        );
    }
}

export default MainPage;
