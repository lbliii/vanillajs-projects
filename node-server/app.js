const http = require('http'); // import the http module

const routes = require('./routes'); // import the routes module

console.log(routes.someText); 

const server = http.createServer(routes.handler); // create a server using the handler function from routes.js

server.listen(3000);

