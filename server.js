const http = require ('http');
const app = require('./app')

const port =  process.env.PORT || 3000; // to get the port via an environment variable if its not set use default of 3000

const server = http.createServer(app);
server.listen(port);