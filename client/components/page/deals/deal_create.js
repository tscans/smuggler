import React, {Component} from 'react';

class DealCreate extends Component {
    closeCreate(){
        var myApp = new Framework7();
        myApp.closeModal();
    }
    render() {
        return (
        	<div>
        		<div className="navbar theme-green my-card-3">
                    <div className="navbar-inner">
                        <div className="right my-left-5"><i onClick={this.closeCreate.bind(this)} className="fa fa-times"></i></div>
                    </div>
                </div>
                <h2>Create Deal</h2>
        	</div>
        );
    }
}

export default DealCreate;