import React, {PropTypes, Component} from 'react'
import GoogleMap from 'google-map-react';
import {greatPlaceStyle} from './my_great_place_styles.js';
// import shouldPureComponentUpdate from 'react-pure-render/function';


export default class Googlemapping extends Component{

  // shouldComponentUpdate = shouldPureComponentUpdate;
  render() {
    return (
       <GoogleMap
        defaultCenter={this.state.center}
        defaultZoom={9}>
      </GoogleMap>
    );
  }
}
//
// <GoogleMap
//   defaultCenter={this.state.center}
//   defaultZoom={this.state.zoom}
//   options={{scrollwheel: false}}>
//   <div style={greatPlaceStyle} lat={this.state.center.lat} lng={this.state.center.lng}>
//   </div>
// </GoogleMap>
