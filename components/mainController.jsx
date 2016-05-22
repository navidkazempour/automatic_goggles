import React from 'react'
import {contacts} from './test.js'
import {wikipedia} from './test1.js'
import $ from "jquery";
import YoutubeController from './youtubeController.jsx'
import WikipediaController from './wikipediaController.jsx'

export default class MainController extends React.Component{
  render(){
    return(
            <div id="media">
              <div id="yt">
                <YoutubeController/>
              </div>
              <div id="wiki">
                  <WikipediaController/>
              </div>
            </div>
        );
  }
}
