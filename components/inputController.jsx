import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import YoutubeController from './youtubeController.jsx'
import WikipediaController from './wikipediaController.jsx'
import TwitterController from './twitterController.jsx'
import SimpleMapPage from './googleMapController.jsx'

export default class Input extends React.Component{
  constructor(props){
    super(props);
    this.state = {data:'', arrived: false, url: ''};
  }
  handleSubmit(e){
    e.preventDefault();
    this.state.url = this.refs.myInput.value;
    $.ajax({
      type: 'POST',
      url: '/search',
      data: {search_term: this.state.url},
      dataType: 'json',
      success:function(searchTerm){
        this.setState({data: ''});
        this.refs.myInput.value = "";
        this.setState({data: searchTerm, arrived:true});
      }.bind(this)
    });
  }
 //upon search function return, update state.data.data

  componentDidUpdate(){
    if(this.state.arrived){
      return(
        ReactDOM.render(<WikipediaController data={this.state.data.data}/>,document.querySelector(".wiki")),
        ReactDOM.render(<TwitterController data={this.state.data.data}/>,document.querySelector(".twitter")),
        ReactDOM.render(<YoutubeController data={this.state.data.data}/>,document.querySelector(".video")),
        ReactDOM.render(<SimpleMapPage data={this.state.data.data}/>,document.querySelector(".map")),
        this.setState({arrived: false})
      );
    }
  }

  render(){
    return(
        <form role="search" className="navbar-form navbar-left" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <input className="form-control" type="text" placeholder="url goes here"  ref="myInput"/>
          </div>
          <button type="submit" className="btn btn-default">read</button>
        </form>
     );
  }
}
