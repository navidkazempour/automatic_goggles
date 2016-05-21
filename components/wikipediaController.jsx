'use strict';
import React from 'react';
import $ from "jquery";
import Wikipedia from './wikipedia.jsx';

export default class WikipediaController extends React.Component {
  constructor(props){
    super(props);
    this.state = {data:[],loading: true};
  }
  componentWillMount(){
      this.serverRequest =$.ajax({
      type: 'POST',
      url: '/wikipedia',
      dataType: 'json',
      success: function(wikiData){
        this.setState({data: wikiData, loading:false});
      }.bind(this)
    });
  }
  render(){
    return(
        <div className="wiki">
          {!this.state.loading ?
<<<<<<< HEAD
            <Wikipedia title={this.state.data.data.title} body={this.state.data.data.body} facts={this.state.data.data.facts} />:
              <h1>Loading...</h1>}
       </div>
=======
            <Wikipedia title={this.state.data.data.title} body={this.state.data.data.body}/>:
            <img className="loading" src="images/loading_spinner.gif" alt="Loading..." />
          }
        </div>
>>>>>>> 6b0f6fa0462053ccbb3b8edf3caf37fa80c4d7f6
     )};
}
