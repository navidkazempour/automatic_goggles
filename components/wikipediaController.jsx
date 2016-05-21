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
    this.serverRequest = $.ajax({
      url: '/wikipedia',
      type: 'POST',
      dataType: 'json',
      success: function(wikiData){
        this.setState({data:wikiData,loading: false});
      }.bind(this)
    });
  }
  render(){
    debugger;
    return(
        <div>
          <Wikipedia title={this.props.wiki.data.title}
            body={this.props.wiki.data.body}/>
       </div>
     )};
}
