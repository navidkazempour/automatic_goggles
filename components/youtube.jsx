'use strict';
import React from 'react';
import YouTube from 'react-youtube';

export default class Youtube extends React.Component{

//    onYouTubeIframeAPIReady(e) {
//   //creates the player object
//   // debugger;
//   var ik_player = document.getElementById('ik_player_iframe');
//
//   console.log('Video API is loaded');
//
//   //subscribe to events
//   ik_player.addEventListener("onReady",       "onYouTubePlayerReady");
//   ik_player.addEventListener("onStateChange", "onYouTubePlayerStateChange");
// }
//
//  onYouTubePlayerReady() {
//   // debugger;
//   console.log('Video is ready to play');
// }
//
//  onYouTubePlayerStateChange(event) {
//   // debugger;
//   console.log('Video state changed');
// }
//   componentDidMount(){
//     this.onYouTubeIframeAPIReady();
//     // debugger;
//   }

  render() {
    return(
        // <embed onSelect={this.somefunctioninController} src={"http://www.youtube.com/embed/"+this.props.videoId+"?controls=0"}/>
        <YouTube videoId={this.props.videoId}/>
    );
  }
}
