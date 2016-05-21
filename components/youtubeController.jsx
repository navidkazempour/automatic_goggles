import React from 'react'
import Youtube from './youtube.jsx'

export default class YoutubeController extends React.Component {
  render(){
    var videoControlller = this.props.videos.map((vid)=>{
      return (
        <Youtube key={vid.id} title={vid.title} videoId={vid.videoId}/>
      );
    });
    return(
        <div>
          {videoControlller}
       </div>
     )};
}
