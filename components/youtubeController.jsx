import React from 'react'
import Youtube from './youtube.jsx'

export default class YoutubeController extends React.Component {
  constructor(props){
    super(props);
    this.state = {data: [], loading: true};
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
    var videoControlller = [];
    if(!this.state.loading){
      videoControlller = this.state.data.data.map((vid)=>{
        return (
          <Youtube key={vid.id} title={vid.title} videoId={vid.videoId}/>
        );
      });
      debugger;
    }
    return(
        <div>
          {!this.state.loading ?
            videoControlller :
            <h1>Loading...</h1>}
       </div>
     )};
}
