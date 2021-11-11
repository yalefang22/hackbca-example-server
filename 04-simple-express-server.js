/*
This creates a simple Express server, extremely similar to 02-simple-http-server.js.
You should compare the two files.

Before you can run this, you'll need to use the Node Package Manager (npm) 
to install the express module for this project. (it's not built-in to Node like http or fs)
> npm install express

If successful, you should see two new things in your project directory:
1)  A new file called `package-lock.json`
2)  A folder called `node_modules`, which contains many subfolders, including one called `express`

Then run this like you did the other servers:
> node 04-simple-express-server.js

Then, open your browser (and/or curl/Postman) and enter these URLs:
- localhost
- localhost/secret
- localhost/leave/me/waiting
- localhost/not/a/thing

Express improves upon the http module in many ways. One improvement is breaking up the giant
handler function into smaller handlers for various routes. Any unhandled routes receive a simple built-in 404 response.

See comments below for a line-by-line breakdown (of new stuff since the last version)

*/
const http = require('http');
// New modules to import: express
const express = require('express'); // import 
const path = require('path');
const PORT = 80;

//Create the server "app" object
const app = express();

//Now, we attach handlers to the app for handling incoming requests

// The use() method attaches a function handler that applies to all requests/responses.
// These handlers are called "middleware", as they are intended to apply between
// receiving the request and finalizing/sending the response
// If multiple functions are registered with use(), they "cascade" through each other.

//Here's a simple request logging middleware; before any responses are prepared, 
//every incoming request should be logged to the console. 
app.use( (req, res, next) => {
    console.log(req.method, req.url); 
    next(); //This passes the handling to the next handler
})



//The get() method attaches final handlers to GET requests for specific URLs
app.get('/', (req, res) => { 
    // status 200 and Content-Type:text/html headers are set automatically 
    // express, but we can also set them manually.

    // res.status(200);
    // res.set('Content-Type', 'text/html');
    res.send("<h1>Hello World!</h1>");
})

app.get('/secret', (req, res) => {
    //We can send non-HTML data. By specifying the Content-Type header, we let the browser
    //know that our content is just plain text

    // res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send("Shh... you found the secret content!")
})

app.get('/leave/me/waiting', (req, res) => {
        // If we fail to manually send a response, 
        // express actually sends a 404, rather than ignoring the request
        return;
})

//A 404 response code (Not Found) is sent for any unhandled routes. 
//This is the standard response for any unsupported URLs

//The "app" object is used as the handler function.
const server = http.createServer(app);
server.listen(PORT);
//Often in examples, the createServer() and listen() lines will be condensed as:
// const server = app.listen(PORT, ...);


console.log(`Express server listening at http://localhost:${PORT}`);