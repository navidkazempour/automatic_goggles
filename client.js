import React from 'react'
import ReactDOM from 'react-dom'
import $ from "jquery";
import YoutubeController from './components/youtubeController.jsx'
import WikipediaController from './components/wikipediaController.jsx'

ReactDOM.render(<WikipediaController/>,document.querySelector(".wiki"));
ReactDOM.render(<YoutubeController/>,document.querySelector(".video_carousel"));
