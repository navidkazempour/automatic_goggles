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
  startpolling(){
    var num = this.state.index;
    setInterval(()=>{
      this.setState({index: num})
      if(num == this.state.data.data.length ){
        debugger;
          num = 0;
      }else{
        num++;
      }
      return(
          <div>
            {!this.state.loading ?
              <Youtube key={this.state.data.data[this.state.index].id}
                title={this.state.data.data[this.state.index].title}
                videoId={this.state.data.data[this.state.index].video_id}/> :
              <h1>Loading...</h1>}
         </div>
       );
    },1000).then(()=>{
    }).bind(this);
  }
  render(){
    console.log(this.state.index);
    if(!this.state.loading  &&  this.state.tag){
      this.setState({loading:true, tag:false});
      this.startpolling();
    }};
}
