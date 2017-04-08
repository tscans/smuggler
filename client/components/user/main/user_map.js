import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
import SinglePage from './page/single_page';

const myStyle = [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#5b6571"},{"lightness":"35"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"color":"#f3f4f4"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"weight":0.9},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#83cead"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"on"},{"color":"#fee379"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#7fc8ed"}]}]

class UserMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapLoaded: false,
      changes: 0
    }
  }
  componentDidMount() {
    console.log('received')
    function initMap(myProps) {
        //@41.6971549,-87.7086321
        //"profile.newLocation"
        var myLocation = {lat: myProps.profile.lat, lng: myProps.profile.long};
        window.map = new google.maps.Map(document.getElementById('mapid'), {
          zoom: 13,
          center: myLocation,
          streetViewControl: false,
          disableDefaultUI: true,
          styles: myStyle
        });
        google.maps.event.addListener(window.map, 'dragend', function(event) {
            var data = {
              long: window.map.getCenter().lng(),
              lat: window.map.getCenter().lat()
            }
            Meteor.call("profile.newLocation", data, (error,data)=>{
              if(error){
                console.log(error);
              }
              else{
                console.log(data)
              }
            })
        });
        console.log(myProps.pages);
        function pinSymbol(color) {
            return {
                path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
                fillColor: color,
                fillOpacity: 1,
                strokeColor: '#999',
                strokeWeight: 2,
                scale: 1,
           };
        }

        myProps.pages.map(p=>{
          var myApp = new Framework7();
 
          var buttons = [
              {
                  text: p.pageName,
                  label: true
              },
              {
                  text: "Open "+p.pageName,
                  onClick: function () {
                      myApp.popup('.popup-about');
                  }
              },
              {
                  text: 'Cancel',
                  color: 'red',
                  onClick: function () {
                      null
                  }
              },
          ];
          var marker = new google.maps.Marker({
            position: {lat:p.lat,lng:p.long},
            map: window.map,
            icon: pinSymbol("#00ff00"),
            animation: google.maps.Animation.DROP
          });
          marker.addListener('click', function() {
            myApp.actions(buttons);
            browserHistory.push('/user/'+p._id+"/")
          });
        })
        
      }
      initMap(this.props);
  }
  search(){
    var myApp = new Framework7();
    myApp.prompt('Pick a new location', 'Search', function (value) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: value }, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {

              window.map.setCenter(results[0].geometry.location);
              window.map.setZoom(13);
            }
        });

    });
  }
  renderPagePop(){
    return(
      <div>
        <SinglePage pageID={this.props.pageID} pages={this.props.pages} profile={this.props.profile}/>
      </div>
    )
  }
  render() {
    console.log(this.props)
    if(!this.props.profile){
      return(<div></div>)
    }
    return (
      <div>
        {this.renderPagePop()}
        <div>
          <div id="mapid"></div>
          <a href="#" className="floating-button color-yellow my-float-up" onClick={this.search.bind(this)}>
              <i className="fa fa-search" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default UserMap; 
