/*
This creates a static Express server that responds to requests for various 
static resource files, which are in the public folder. 
It is extremely similar to 03-static-http-server.js.
You should compare the two files.

If you didn't before, make sure you've also installed express (> npm install express).
You must now also install two more modules: morgan and path. 
> npm install morgan path
Any Node modules that aren't built-in can be installed easily this way

Then run this like you did the other servers:
> node 05-static-express-server.js

Then, open your browser (and/or curl/Postman) and enter these URLs:
- localhost
- localhost/events.html
- localhost/events/1.html
- localhost/not/a/thing
You can try any other filepath in your public folder too.
 
This essentially resembles how Github Pages and other simple hosting options
work (for now, it feels similar to VSCode's Live Server). 

Note: The express.static middleware handles all requests for files in the public folder.

See comments below for a line-by-line breakdown (of new stuff since the last version)

*/
const http = require('http');
const express = require('express');
const path = require('path'); //path module helps construct filepaths
const logger = require('morgan'); //morgan module provides logging middleware

const PORT = 80;
const app = express();

//The morgan logging middleware logs requests very nicely 
//This is much than our simple logging middleware in 04-simple-express-server.js
app.use(logger('dev'));

//express.static() produces middleware that handles requests for static resources.
//If the request URL matches a file in the given folder, the middlware
//handles responding with that resource.
//Otherwise, the request continues to the other routes.
app.use(express.static(path.join(__dirname, 'public')));

//Send the index.html file for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = http.createServer(app);
server.listen(PORT);
//Often in examples, the createServer() and listen() lines will be condensed as:
// const server = app.listen(PORT, ...);

console.log(`Express server listening at http://localhost:${PORT}`);

