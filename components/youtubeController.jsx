import React from 'react';
// import Youtube from './youtube.jsx';
// import Video from 'react-video';
// import Youtube from 'react-youtube'
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import YouTube from 'react-youtube';

export default class YoutubeController extends React.Component {

  constructor(props){
    super(props);
    this.state = {data: [], loading: true, index: 0, play: false, myvar: null};
    this.myvar = nul
  }

  componentWillMount(){
      this.serverRequest =$.ajax({
      type: 'POST',
      url: '/youtube',
      data: {search_term:'Steve Jobs'},
      dataType: 'json',
      success: function(youtubeData){
        this.setState({data: youtubeData, loading:false});
      }.bind(this)
    });
  }
  // _refresh(){
  //   if(this.state.play){
  //     debugger;
  //     this.setState({play: false, index: this.state.index + 1});
  //   }
  // }
  // _pause(){
  //   if(this.state.play){
  //     debugger;
  //     this.setState({play: false, index: this.state.index + 1});
  //   }
  // }
  // _play(){
  //   clearTimeout(this.myvar);
  //   this.setState({play: true});
  // }
    _state(e){
      if(e.data === 1)
      {
        console.log("Playing");
        clearTimeout(this.myvar);
      }
      else if(e.data === 2){
        console.log("Pausing");
        debugger;
      }
      else if(e.data === 0){
        console.log("ended");
        debugger;
      }
    }

  render(){
    if(!this.state.loading){
      console.log(this.state.index);
    this.myvar = setTimeout(()=>{
      if (this.state.index >= this.state.data.data.length-1){
        this.setState({index: 0});
      }else{
        this.setState({index: this.state.index + 1});
      }
    },10000);}

    var divStyle = {
      width: '30%' ,
      height: '30%'
    }
    return(
        <div style={divStyle}>
          {!this.state.loading ?
              <YouTube key={this.state.index + 1}
                videoId={this.state.data.data[this.state.index].video_id}
                onStateChange={this._state}   /> :
            <img className="loading" src="images/loading_spinner.gif" alt="Loading..." />}
            <button onClick={this._refresh}>Refresh</button>
       </div>
     );
    };
}
