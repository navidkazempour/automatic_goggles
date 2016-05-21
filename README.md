#### Meta News Link Analysis

Single page application that takes as input data a news article and gives back a single page of results that includes most relevant wiki article for background reading, mapped location of relevant location for geographic context, relevant photos, relevant short video clips. Lastly, it will find tweets relevant to the event (if applicable), so that the user can join a unified conversation. All of the above results will be filtered by different criteria and results will have scrolling disabled.

##### Development (Few Tips Before Starting):
1. Install nodemon:
	`npm install -g nodemon`
   This module will allow you to make changes to your files without having the user to close and reopen the server.
2. Install node inspector:
	npm install -g node-inspector
   A debugger for node js.
   Two ways of using it:
   1. node-debug server.js
   	This will allow us to automatically start debugging the server using the Inspector on Chrome Browser.
   2. Using two terminals, start one by typing 'node-inspector' and then copying the url into the browser and starting the second terminal by typing nodemon --debug server.js. In addition, type in 'debugger;' wherever you require it inside the js file.
   additional: --debug-brk
3. Jade, handlebars, & ejs are tools to render html in node, similar to erb in sinatra.

##### Git (team process):
1. Sync your fork with upstream.
2. Merge the new code from upstream with your code on your branch.
3. Push your branch to to upstream.
4. Open a pull request on Github to merge your branch with upstream/development.

##### Database (getting started for development):
1. Now using MongoDB
