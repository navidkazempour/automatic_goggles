import React from 'react'
import Youtube from './youtube.jsx'

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
    return(
        <div>
          {!this.state.loading ?
            <Youtube key={this.state.data.data[this.state.index].id}
              title={this.state.data.data[this.state.index].title}
              videoId={this.state.data.data[this.state.index].video_id}/> :
            <img className="loading" src="images/loading_spinner.gif" alt="Loading..." />}
       </div>
     );
    };
}
