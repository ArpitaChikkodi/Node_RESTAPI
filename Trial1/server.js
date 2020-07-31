const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);

// steps
// npm init
// npm install --save express
// node server.js ==>to run and send request from postman
// npm install --save-dev nodemon ==> only for project so add in scripts as start (nodemon server.js)
// npm start 
// npm install --save morgan ==> to lock and handle further, it displays req details
// npm install --save body-parser ==> to parse the req because they are not in formatted manner
// cors (Cross Origin Resource Sharing) error ==> when client and server are on diff machines it should accept request so add in app.js
// mongodb atlas - create cluster and deploy
// npm install --save mongoose