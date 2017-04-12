import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
import SinglePage from './page/single_page';
import {Page} from '../../../../imports/collections/page';
import moment from 'moment';

const myStyle = [
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#5b6571"
            },
            {
                "lightness": "35"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f3f4f4"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "weight": 0.9
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#83cead"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#fee379"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#373a03"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#00ff61"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "hue": "#00ffaa"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#bfbfbf"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#7fc8ed"
            }
        ]
    }
]

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
        console.log('new map')
        var myLocation = {lat: myProps.profile.lat, lng: myProps.profile.long};
        window.map = new google.maps.Map(document.getElementById('mapid'), {
          zoom: 13,
          center: myLocation,
          streetViewControl: false,
          disableDefaultUI: true,
          styles: myStyle
        });
        console.log(myProps.pages);
        var idArray = [];
        for(var i = 0; i< myProps.deals.length; i++){
          idArray.push(myProps.deals[i].pageID)
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
          var color = "#aaaaaa";
          if(idArray.includes(p._id)){
            color = "#00ff00"
          }
          var marker = new google.maps.Marker({
            position: {lat:p.lat,lng:p.long},
            map: window.map,
            icon: pinSymbol(color),
            animation: google.maps.Animation.DROP
          });
          marker.addListener('click', function() {
            myApp.actions(buttons);
            browserHistory.push('/user/p/'+p._id+"/")
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
              console.log(results[0].geometry.location.lat())
              var data = {
                long: results[0].geometry.location.lng(),
                lat: results[0].geometry.location.lat()
              }
              Meteor.call("profile.newLocation", data, (error,data)=>{
                if(error){
                  console.log(error)
                }
                else{
                  console.log('ok')
                  location.reload();
                  
                }
              })
             
            }
        });

    });
    console.log('logged')
  }
  renderPagePop(){
    return(
      <div>
        <SinglePage pageID={this.props.pageID} pages={this.props.pages} profile={this.props.profile}/>
      </div>
    )
  }
  logit(){
    console.log('LOGIT')
    var latlong = {
      long: window.map.getCenter().lng(),
      lat: window.map.getCenter().lat()
    }
    console.log(latlong)
    Meteor.call("profile.newLocation", latlong, (error,data)=>{
      if(error){
        console.log(error);
      }
      else{
        Meteor.subscribe('localPages');
        Meteor.subscribe('localDeals');
        var cube3 = this.props.pages
        var idArray = [];
        var d = new Date();
        var day = moment(d).format("ll");
        for(var i = 0; i< this.props.deals.length; i++){
          if(this.props.deals[i].date == day){
            idArray.push(this.props.deals[i].pageID)
          }
          
        }
        cube3.map(p=>{
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
          var color = "#aaaaaa";
          if(idArray.includes(p._id)){
            color = "#00ff00"
          }
          var marker = new google.maps.Marker({
            position: {lat:p.lat,lng:p.long},
            map: window.map,
            icon: pinSymbol(color)
          });
          marker.addListener('click', function() {
            myApp.actions(buttons);
            browserHistory.push('/user/p/'+p._id+"/")
          });
        })
      }
    })
   }
  render() {
    if(!this.props.profile || !this.props.pages || !this.props.deals){
      return(<div></div>)
    }
    return (
      <div>
        {this.renderPagePop()}
        <div>
          <div id="mapid" className="my-fix-map" onClick={this.logit.bind(this)}></div>
          <a href="#" className="floating-button color-yellow my-float-up" onClick={this.search.bind(this)}>
              <i className="fa fa-search" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default createContainer((props)=>{
    Meteor.subscribe("localPages");

    return {pages: Page.find({}).fetch()}

  
}, UserMap);  
