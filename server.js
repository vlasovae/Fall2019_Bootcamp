var http = require('http'), 
fs = require('fs'), 
url = require('url'),
port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url).pathname;
  if (parsedUrl != '/listings') {
      response.writeHead(404, {'Content-Type' : 'text/plain'});
      response.write("Bad gateway error"); 
      response.end();
  } else {
      response.writeHead(200, {'Content-Type' : 'application/json'});
      response.write(listingData);
      response.end();
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {

   // Check for errors
   if (err) {
       throw err;
   }
   
   // Store the JSON data
   listingData = data;

   // Create and start the server with the appropriate callback
   server = http.createServer(requestHandler);
   server.listen(port, function(){
      console.log("server listening on: http://localhost:" + port);
   });
});
