'use strict';
import React from 'react'
import WikipediaFact from './wikipediaFact.jsx'


export default class Wikipedia extends React.Component{
  render() {
    var self = this;
    var wikipediaFact = Object.keys(this.props.facts).map(function(keys){
      return(<WikipediaFact key={keys} factkey={keys} factText={self.props.facts[keys]}/>);
    });
    return(
        <div id="wikipedia">
          <h2>{this.props.title}</h2>
          <p>{this.props.body}</p>
          <a className="wiki_ref" href="#">Read more on <img src="images/Wikipedia-word.png" alt="Wikipedia" /></a>
        </div>
    );
  }
}
