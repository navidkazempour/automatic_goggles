'use strict';
import React from 'react'
import WikipediaFact from './wikipediaFact.jsx'


export default class Wikipedia extends React.Component{

  render() {
    return(
        <div>
          <h2>{this.props.title}</h2>
          <p>{this.props.body}</p>
        </div>
    );
  }
}
