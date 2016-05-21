'use strict';
import React from 'react';

export default class WikipediaFact extends React.Component{
  render(){
    return(
          <ul>
            <li>{this.props.factkey}</li>
            <li>{this.props.factText}</li>
          </ul>
          );
  }
}
