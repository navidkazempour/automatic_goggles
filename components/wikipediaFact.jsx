'use strict';
import React from 'react';
var Carousel = require('nuka-carousel');

// export default class WikipediaFact extends React.Component{
//   mixins: [Carousel.ControllerMixin],
//   render(){
//     return(<h1>Hello World</h1>)
//   }
// }
// reactMixin(WikipediaFact.prototype, someMixin);
const WikipediaFact = React.createClass({
  mixins: [Carousel.ControllerMixin],
  render() {
    return (
      <Carousel>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6"/>
      </Carousel>
    )
  }
});

module.exports = WikipediaFact;
