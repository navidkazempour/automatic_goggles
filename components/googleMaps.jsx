import React, {PropTypes, Component} from 'react';
// import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';

export default class SimpleMapPage extends Component {

  // shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state={
      center: {lat: 60.955413, lng: 30.337844},
      zoom: 9,
      greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
    }
  }

  render() {
    return (
        <GoogleMap
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          options={{scrollwheel: false}}>
          <div className="place" lat={60.955413} lng={30.337844}>MyPlace</div>
        </GoogleMap>
    );
  }
//   Counter.propTypes = { initialCount: React.PropTypes.number };
// Counter.defaultProps = { initialCount: 0 };
// SimpleMapPage.propTypes = {
//   center: {lat: 59.938043, lng: 30.337157},
//   zoom: 9,
//   greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
// };
//   SimpleMapPage.defaultProps = {
//     center: {lat: 59.938043, lng: 30.337157},
//     zoom: 9,
// {/*<MyGreatPlace lat={59.955413} lng={30.337844} text={'A'} /* Kreyser Avrora */ />
// <MyGreatPlace {...this.props.greatPlaceCoords} text={'B'} /* road circle */ />*/}
//     greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
//   };

}

































































// import React from 'react'
// import ReactDOM from 'react-dom'
//
// export default class ExampleGoogleMap extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={map:null};
//   }
//   // constructor(props){
//   //   super(props);
//   //   this.state ={
//   //           initialZoom: 8,
//   //           mapCenterLat: 43.6425569,
//   //           mapCenterLng: -79.4073126,
//   //           map: null
//   //       };
//   // }
//   // componentDidMount(){
//   //   var mapOptions = {
//   //           center: this.state.mapCenterLatLng(),
//   //           zoom: this.state.initialZoom
//   //       },
//   //       map = new google.maps.Map(this.getDOMNode(), mapOptions);
//   //       var marker = new google.maps.Marker({position: this.state.mapCenterLatLng(), title: 'Hi', map: map});
//   //       this.setState({map: map});
//   // }
//   // mapCenterLatLng() {
//   //       var props = this.state;
//   //       return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
//   //   }
//     createMap(element){
//       var mapOptions = {
//           center: this.mapCenterLatLng(),
//           zoom: 8
//         };
//
//         var map = new google.maps.Map(element, mapOptions);
//         var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});
//         this.setState({map: map});
//     }
//     mapCenterLatLng(){
//         var props = this.props;
//         return new google.maps.LatLng(-34.397,150.644);
//     }
//     render() {
//         return (
//         	<div ref={this.createMap} className='map-gic'></div>
//         );
//     }
// }
