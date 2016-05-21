'use strict';
import React from 'react'
import WikipediaFact from './wikipediaFact.jsx'


export default class Wikipedia extends React.Component{

  render() {
    return(
      <div>
        <div>
          <h1>{this.props.title}</h1>
        </div>
        <div>
          <p>{this.props.body}</p>
        </div>
      </div>
    );
  }
}
