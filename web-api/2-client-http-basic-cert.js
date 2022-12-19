#!/usr/bin/env node
import express from 'express';
import fetch from 'node-fetch';
import https from 'https';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const HOST = '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || 'localhost:4000';
const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let caPath = path.join(__dirname + '/../shared/tls/ca-certificate.cert');

const options = {
  agent: new https.Agent({
    ca: fs.readFileSync(caPath, {encoding: 'utf8'})
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
  console.log(`consumer running at ${HOST}:${PORT}`);
});
