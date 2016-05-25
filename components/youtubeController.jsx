import React from 'react';
import Youtube from './youtube.jsx';
// import Video from 'react-video';
// import Youtube from 'react-youtube'
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
// import YouTube from 'react-youtube';

export default class YoutubeController extends React.Component {

  constructor(props){
    super(props);
    this.state = {data: [], loading: true, index: 0, play: false, myvar: null};
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
    // _state(e){
    //   if(e.data === 1)
    //   {
    //     console.log("Playing");
    //     clearTimeout(this.myvar);
    //   }
    //   else if(e.data === 2){
    //     console.log("Pausing");
    //     debugger;
    //   }
    //   else if(e.data === 0){
    //     console.log("ended");
    //     debugger;
    //   }
    // }

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
    return(
        <div>
          {!this.state.loading ?
              <Youtube key={this.state.index + 1}
                videoId={this.state.data.data[this.state.index].video_id}/> :
            <img className="loading" src="images/loading_spinner_inverse.gif" alt="Loading..." />}
       </div>
     );
    };
}
