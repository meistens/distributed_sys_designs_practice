#!/usr/bin/env node

const http = require('http');
const server = http.createServer((req, res) => {
  console.log('current conn', server._connections);
  setTimeout(() => res.end('OK'), 10_000); // simulates async activity
});

server.maxConnections = 2; // set max connects to 2
server.listen(3020, 'localhost');
