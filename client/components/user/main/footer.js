import React, {Component} from 'react';

class Footer extends Component {
	mapIt(){
		this.props.showMap();
	}
	topIt(){
		this.props.showTop();
	}
	listIt(){
		this.props.showList();
	}
    render() {
        return (
        	<div>
			    <div className="toolbar tabbar tabbar-labels my-footer-height">
				    <div className="toolbar-inner">
				    	<a href="#" onClick={this.mapIt.bind(this)} className="tab-link active">
				            <span className="tabbar-label"><i className="fa fa-map"></i> Map</span>
				        </a>
				        <a href="#" onClick={this.topIt.bind(this)} className="tab-link active">
				            <span className="tabbar-label"><i className="fa fa-arrow-up"></i> Top Deals</span>
				        </a>
				        <a href="#" onClick={this.listIt.bind(this)} className="tab-link active">
				            <span className="tabbar-label"><i className="fa fa-list"></i> Pages</span>
				        </a>
				    </div>
				</div>
			</div>
        );
    }
}

export default Footer;
