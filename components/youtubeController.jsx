import React from 'react';
import YouTube from 'react-youtube';

export default class YoutubeController extends React.Component {

  constructor(props){
    super(props);
    this.state = {data: [], loading: true, index: 0, play: false, myvar: null,counter: 0};
  }

  componentWillMount(){
      this.serverRequest =$.ajax({
      type: 'POST',
      url: '/youtube',
      data: {search_term:'Bill Gates'},
      dataType: 'json',
      success: function(youtubeData){
        this.setState({data: youtubeData, loading:false});
      }.bind(this)
    });
  }
    _state(e){
      if(e.data === 1)
      {
        console.log("Playing");
        clearTimeout(this.myvar);
      }
      else if(e.data === 2){
        console.log("Pausing");
        this.setState({index: this.state.index + 1});
      }
      else if(e.data === 0){
        console.log("ended");
        this.setState({index: this.state.index + 1});
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
    return(
        <div>
          {!this.state.loading ?
              <YouTube key={this.state.counter + 1}
                videoId={this.state.data.data[this.state.index].video_id}
                onStateChange={this._state.bind(this)}/> :
            <img className="loading" src="images/loading_spinner.gif" alt="Loading..." />}
       </div>
     );
    };
}
