import React from 'react'
import ReactDOM from 'react-dom'
import $ from "jquery";
import YoutubeController from './youtubeController.jsx'
import WikipediaController from './wikipediaController.jsx'
import TwitterController from './twitterController.jsx'
import SimpleMapPage from './googleMaps.jsx'

ReactDOM.render(<WikipediaController/>,document.querySelector(".wiki"));
ReactDOM.render(<YoutubeController/>,document.querySelector(".video"));
ReactDOM.render(<TwitterController/>,document.querySelector(".twitter"));
ReactDOM.render(<SimpleMapPage/>,document.querySelector(".map"));
