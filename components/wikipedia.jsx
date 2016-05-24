'use strict';
import React from 'react'

export default class Wikipedia extends React.Component{
  render() {
    return(
        <div id="wikipedia">
          <h2>{this.props.title}</h2>
          <p>{this.props.body}</p>
          <a className="wiki_ref" href="#">Read more on <img src="images/Wikipedia-word.png" alt="Wikipedia" /></a>
        </div>
    );
  }
}
