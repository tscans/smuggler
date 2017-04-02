import React, {Component} from 'react';

class Footer extends Component {
	modal(){
		console.log('clicked')
		var myApp = new Framework7();
 
    	var $$ = Dom7;
		myApp.alert('Here goes alert text');
	}
	pickApp(){
		var myApp = new Framework7();
 
		var $$ = Dom7;
		 
		var buttons = [
	        {
	            text: 'iOS',
	            bold: true,
	            onClick: function () {
	                myApp.alert('Button1 clicked');
	            }
	        },
	        {
	            text: 'Android',
	            bold: true,
	            onClick: function () {
	                myApp.alert('Button1 clicked');
	            }
	        },
	        {
	            text: 'Cancel',
	            color: 'red'
	        },
	    ];
	    myApp.actions(buttons);
	}
    render() {
        return (
        	<div>
			    <div className="my-card-3 toolbar tabbar tabbar-labels">
				    <div className="toolbar-inner">
				    	<a href="#" onClick={this.pickApp.bind(this)} className="tab-link active">
				            <span className="tabbar-label">Download App</span>
				        </a>
				        <a href="#tab1" className="tab-link active">
				            <span className="tabbar-label">How Does It Work</span>
				        </a>
				    </div>
				</div>
			</div>
        );
    }
}

export default Footer;
