import React from 'react'
import ReactDOM from 'react-dom'

export default class ExampleGoogleMap extends React.Component{
  constructor(props){
    super(props);
    this.state={map:null};
  }
  // constructor(props){
  //   super(props);
  //   this.state ={
  //           initialZoom: 8,
  //           mapCenterLat: 43.6425569,
  //           mapCenterLng: -79.4073126,
  //           map: null
  //       };
  // }
  // componentDidMount(){
  //   var mapOptions = {
  //           center: this.state.mapCenterLatLng(),
  //           zoom: this.state.initialZoom
  //       },
  //       map = new google.maps.Map(this.getDOMNode(), mapOptions);
  //       var marker = new google.maps.Marker({position: this.state.mapCenterLatLng(), title: 'Hi', map: map});
  //       this.setState({map: map});
  // }
  // mapCenterLatLng() {
  //       var props = this.state;
  //       return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
  //   }
    createMap(element){
      var mapOptions = {
          center: this.mapCenterLatLng(),
          zoom: 8
        };

        var map = new google.maps.Map(element, mapOptions);
        var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});
        this.setState({map: map});
    }
    mapCenterLatLng(){
        var props = this.props;
        return new google.maps.LatLng(-34.397,150.644);
    }
    render() {
        return (
        	<div ref={this.createMap} className='map-gic'></div>
        );
    }
}
