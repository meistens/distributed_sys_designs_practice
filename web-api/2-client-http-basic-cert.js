#!/usr/bin/env node
// not as effective as reverse proxy
const express = require('express');
const fetch = require('node-fetch')
const https = require('https')
const HOST = '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || 'localhost:4000';
const server = express();

const options = {
  agent: new https.Agent({
    ca: fs.readFileSync(__dirname+'/../shared/tls/ca-certificate.cert')
  }),
};

server.get('/', async () => {
  const req = await fetch(`https://${TARGET}/recipes/42`, options);
  const payload = await req.json();

  return {
    consumer_pid: process.pid,
    producer_data: payload,
  };
});

server.listen(PORT, HOST, () => {
  console.log(`consumer running at http://${HOST}:${PORT}`);
});
