import React from 'react';
import Youtube from './youtube.jsx';
// import Video from 'react-video';
// import Youtube from 'react-youtube'
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class YoutubeController extends React.Component {
  constructor(props){
    super(props);
    this.state = {data: [], loading: true, index: 0, tag: true};
  }
  componentWillMount(){
      this.serverRequest =$.ajax({
      type: 'POST',
      url: '/youtube',
      dataType: 'json',
      success: function(youtubeData){
        this.setState({data: youtubeData, loading:false});
      }.bind(this)
    });
  }
  render(){
    if(!this.state.loading){
    setTimeout(()=>{
      if (this.state.index >= this.state.data.data.length-1){
        this.setState({index: 0});
      }else{
        this.setState({index: this.state.index + 1});
      }
    },10000);}
    return(
        <div>
          {!this.state.loading ?
            <Youtube key={this.state.index + 1}
              videoId={this.state.data.data[this.state.index].video_id} onReady={this._onReady}/> :
            <img className="loading" src="images/loading_spinner_inverse.gif" alt="Loading..." />}
       </div>
     );
    };
}
