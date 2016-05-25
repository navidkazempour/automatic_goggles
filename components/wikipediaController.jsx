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
      $.ajax({
      type: 'POST',
      data: {search_term: 'Edward M. Nero'},
      url: '/wikipedia',
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
              <img className="loading" src="images/loading_spinner.gif" alt="Loading..." />}
       </div>
     )
  }
}
