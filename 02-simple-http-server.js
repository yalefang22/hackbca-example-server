/*
This creates a simple HTTP server that
responds to HTTP requests for various URLs differently. 
See comments below for a line-by-line breakdown.

Run the program with the following console command:
> node 02-simple-http-server.js

Then, open your browser and enter these URLs:
- localhost
- localhost/secret
- localhost/leave/me/waiting
- localhost/not/a/thing
//Check out the Network tab in your browser's Developer Tools (Right-click -> Inspect) 


In addition to a web browser, you can also test your server with another console and the "curl" command. For example, try:
> curl localhost
To see the response headers, use the -v (verbose) option:
> curl localhost -v

See comments below for a line-by-line breakdown (of new stuff since the last version)

*/

//require is used in NodeJS to import modules 
const http = require('http');
const PORT = 80;

function handler(request, response) {
    //log the HTTP request to the server's console
    console.log(`${request.method} ${request.url}`);

    if (request.url === "/") {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('<h1>Welcome to the homepage!</h1>');
        return;
    }
    else if (request.url === "/secret") {
        //We can send non-HTML data. By specifying the Content-Type header, we let the browser
        //know that our content is just plain text
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Shh... you found the secret content!');    
        return;
    } 
    else if (request.url === '/leave/me/waiting') {
        // If we fail to send a response, the browser is left waiting.
        return; 
    }
    else {
        //A 404 response code means Not Found. 
        //This is the standard response for any unsupported URLs
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end(`<p style='color:red'>Sorry, whatever you are looking for (${request.url}) doesn't exist!</p>`);
    }
}

// Create a serve" that uses the above function to handle incoming requests.
const server = http.createServer(handler);
// Have the server listen on the specified port.
server.listen(PORT);

// Noting that the server is running, and how we can test it locally
console.log(`HTTP server listening at http://localhost:${PORT}`)

