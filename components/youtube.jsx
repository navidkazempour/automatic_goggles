'use strict';
import React from 'react'

export default class Youtube extends React.Component{
  render() {
    return(
      <div>
        <h1>{this.props.title}</h1>
      <div>
        <iframe src={"http://www.youtube.com/embed/"+this.props.videoId} ></iframe>
      </div>
      </div>
    )
  }
}
