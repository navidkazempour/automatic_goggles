'use strict';
import React from 'react';
import Wikipedia from './wikipedia.jsx';

export default class WikipediaController extends React.Component {
  constructor(props){
    super(props);
    this.state = {data: [], loading: true};
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
        <div>
          {!this.state.loading ?
            <Wikipedia title={this.state.data.data.title} body={this.state.data.data.body} facts={this.state.data.data.facts} />:
              <h1>Loading...</h1>}
       </div>
     )};
}
