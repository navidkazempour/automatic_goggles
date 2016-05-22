#### Meta News Link Analysis

Single page application designed to let news readers get background info on the subject of their reading and help them tap into a unified conversation.

It takes as input data a news article and gives back a single page of results that includes:
1. a relevant wiki article
2. a mapped location of relevant location for geographic context
3. relevant photos
4. relevant short video clips.
5. if applicable, it will find tweets relevant to the event, and allow the user to participate in the conversations.

All of the above results will be filtered by varied criteria.

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

##### Git (team process):
1. Sync your fork with upstream.
2. Merge the new code from upstream with your code on your branch.
3. Push your branch to to upstream.
4. Open a pull request on Github to merge your branch with upstream/development.

##### Database (getting started for development):
1. Now using MongoDB
