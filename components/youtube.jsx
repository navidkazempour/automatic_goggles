'use strict';
import React from 'react'

export default class Youtube extends React.Component{
  render() {
    return(
        <iframe src={"http://www.youtube.com/embed/"+this.props.videoId} ></iframe>
    )
  }
}
