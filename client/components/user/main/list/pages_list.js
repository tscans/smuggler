import React from 'react';

class PagesList extends React.Component{
	renderList(){
		return this.props.pages.map(p=>{
			var myStyle = {
				backgroundImage: 'url(' + p.image + ')',
				width: "40%",
				height: "15vh",
				float: "left"
			}
			var myStyle2 = {
				width: "59%",
				height: "15vh",
				float: "right"
			}
			return(
				<div className="go-fucking-center" key={p._id}>
					<div className="card demo-card-header-pic">
					  <div style={myStyle} className="card-header color-white no-border"></div>
					  <div style={myStyle2}>
					  	<h3>{p.pageName}</h3>
					  </div>
					  <div className="card-footer">
					    <a href="#" className="link my-link-right">Favorite {p.mcfan.length.toString()} <i className="fa fa-star" aria-hidden="true"></i></a>
					  </div>
					</div>
				</div>
			)
		})
	}
	render(){
		return(
			<div>
				{this.renderList()}
			</div>
		)
	}
}

export default PagesList;


