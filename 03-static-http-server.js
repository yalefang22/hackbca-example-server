/*
This creates a static HTTP server that responds to requests for various 
static resource files, which are in the public folder. 

Then run this like you did the other servers:
> node 03-static-http-server.js

Then, open your browser (and/or curl/Postman) and enter these URLs:
- localhost
- localhost/events.html
- localhost/events/1.html
- localhost/not/a/thing
You can try any other filepath in your public folder too.

This essentially resembles how Github Pages and other simple hosting options
work (for now, it feels similar to VSCode's Live Server). 

See comments below for a line-by-line breakdown (of new stuff since the last version)

You can use curl's -X flag to try request methods other than just GET.
For example, send a DELETE request below 
> curl -X DELETE localhost -v

Note: The Postman API platform is another great way to test your server instead of curl (or just your browser)
Download Desktop apps at : https://www.postman.com/downloads/
Try the Web version at: go.postman.co/home 
*/

const http = require('http');
const PORT = 80;

const fs = require('fs'); //The fs (file system) module helps work with files

function handler(request, response) {
    console.log(`${request.method} ${request.url}`)

    if (request.method === 'GET'){ //GET is the default method for browsers

        //A lack of URL path usually means homepage
        if (request.url == "/")
            request.url = "/index.html"

        //Attempt to read the requested resource in the public folder; 

        // fs.readFile attempts to read a local file. Since this can take some time, 
        // it runs "asynchronously" and requires a "callback function" to handle the data once the file is ready.
        // Here, an unnamed "arrow" function is used to conveniently in-line it, similar to a lambda
        fs.readFile("public" + request.url, (err , data) => {
            console.log("sugma dick public" + request.url);
            console.log(`Attempted load for ${request.url} has completed!`)

            //The first parameter will be an Error object if anything goes wrong.
            if (err) {
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.end('Sorry, whatever you are looking for doesn\'t exist!');
                return
            }
            //If no error, write the file data into the body of the response
            response.writeHead(200);
            response.end(data);
        });
        // Note that the code continues, without waiting for the file to finish being read
        // This keeps the server from getting stuck handling one request while others are waiting
        console.log(`Attempted load for ${request.url} has begun...`)
    } 
    else {// If the method is not GET, also send an error
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end(`Sorry, the method ${request.method} is not supported!`);
    }
}

const server = http.createServer(handler);
server.listen(PORT);

console.log(`HTTP server listening at http://localhost:${PORT}`)