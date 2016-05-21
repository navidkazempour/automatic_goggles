import React from 'react'
import {contacts} from './test.js'
import {wikipedia} from './test1.js'
import $ from "jquery";
import YoutubeController from './youtubeController.jsx'
import WikipediaController from './wikipediaController.jsx'

export default class MainController extends React.Component{
  constructor(props){
    super(props);
    this.state = {data: [], loading: true};
  }
  componentWillMount(){
      this.serverRequest =$.ajax({
      type: 'POST',
      url: '/wikipedia',
      dataType: 'json',
      success: function(data){
        this.setState({data: data, loading:false});
      }.bind(this)
    });
  }
  render(){
    console.log(this.state.data);
    return(
            <div id="media">
              <div id="yt">
                <YoutubeController videos={contacts}/>
              </div>
              <div id="wiki">
                {!this.state.loading ?
                  <WikipediaController wiki={this.state.data}/> :
                  <h1>Loading...</h1>}
              </div>
            </div>
        );
  }
}
