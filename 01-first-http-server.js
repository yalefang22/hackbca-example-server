/*
This creates a HTTP server that listens for HTTP requests and sends 
responses with a bit of HTML.

See comments below for a line-by-line breakdown.

Run the program with the following console command:
> node 01-first-http-server.js

Notice that a URL is printed to the console, and the program continues to run. 
HTTP servers essentially run forever, unless they crash or interrupted. 
(Use Ctrl-C to manually interrupt the server. You should do this whenever you're done 
testing it, or after you update the code so you can restart it.)

Then, open your browser and enter these URLs:
- http://localhost:80
- http://localhost
       (note that the :80 is optional when the port is the standard 80)
- http://localhost/sample/route

Visiting a webpage URL in the browser sends an HTTP GET request to the server 
hosted at that domain (The psuedo-domain localhost refers to your own computer), 
listening to port 80 (or whatever port # comes after the : colon). 

It waits for an HTTP response, the content of which then gets displayed. (If HTML, it is parsed and rendered)
In each case, the browser should receive the HTTP response and show a webpage with "Hello browser!"

In the console, you should see "GET /" and "GET /sample/route", respectively. 
With each visit, you may also see "GET /favicon.ico"; this is browser making an extra request 
for an icon to display in the browser tab.

In addition to a web browser, you can also test your server with another console and the "curl" command. For example, try:
> curl localhost
To see the response headers, use the -v (verbose) option:
> curl localhost -v
*/

//require is used in NodeJS to import modules 
const http = require('http');
//The standard port for HTTP is 80, but you can change this during development
const PORT = 80;

// A function that will be called to handle incoming HTTP requests.
// Two parameters are given: 
// 1) a "request" object (often abbr. as req), which contains information 
//    about/from the incoming HTTP request
// 2) a "response" object (often abbr. as res), which is to be used to 
//    prepare and send back an HTTP response 
function handler(request, response) {
    //log the HTTP request to the server's console
    console.log(`${request.method} ${request.url}`);

    // prepare the response HEAD; includes setting the response code (200 OK)
    // and additional headers. (Some headers are included by default)
    response.writeHead(200, {'Content-Type': 'text/html'});
    // specify the response BODY and send the response.
    response.end('<h1>Hello browser!</h1>');
}

// Create a serve" that uses the above function to handle incoming requests.
const server = http.createServer(handler);

// Have the server listen on the specified port.
server.listen(PORT);

// Noting that the server is running, and how we can test it locally
console.log(`HTTP server listening at http://localhost:${PORT}`)

