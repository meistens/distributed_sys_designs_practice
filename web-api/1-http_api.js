#!/usr/bin/env node

const express = require('express')
const fetch = require('node-fetch')
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || 'localhost:4000';
const server = express();

server.get('/', async () => {
  const req = await fetch(`http://${TARGET}/recipes/42`);
  const producerData = await req.json();

  return res.status(200).json({
    consumer_pid: process.pid,
    producerData,
  });
});

server.listen(PORT, HOST, () => {
  console.log(`consumer running at http://${HOST}:${PORT}/`);
});
