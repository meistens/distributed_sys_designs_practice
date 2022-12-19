#!/usr/bin/env node
// not as effective as using reverse proxy
// going from http to https using self-signed certificates generated
const fs = require('fs');
const express = require('express');

const server = express({
  https: {
    key: fs.readFileSync(__dirname+'/tls/producer-private-key.key'),
    cert: fs.readFileSync(__dirname+'/../shared/tls/producer-certificate.cert'),
  }
});

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;

server.get('/recipes/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (id !== 42) return res.status(404).json({ message: 'not found' });
  return res.status(200).json({
    producer_pid: process.pid,
    recipe: {
      id,
      name: 'test',
      steps: 'do this',
      ingredients: [
        {
          id: 1,
          name: 'test',
        },
      ],
    },
  });
});

server.listen(PORT, HOST, () => {
  console.log(`producer runnig at https://${HOST}:${PORT}`);
});
