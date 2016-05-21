'use strict';
import React from 'react';
import Wikipedia from './wikipedia.jsx';

export default class WikipediaController extends React.Component {
  render(){
    return(
        <div>
          <Wikipedia title={this.props.wiki.data.title}
            body={this.props.wiki.data.body}/>
       </div>
     )};
}
