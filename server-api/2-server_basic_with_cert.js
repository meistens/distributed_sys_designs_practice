#!/usr/bin/env node
import fs from 'fs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let keyFilePath = path.join(__dirname + '/tls/basic-private-key.key');
let certFilePath = path.join(__dirname + '/../shared/tls/basic-certificate.cert');

const server = express({
  https: {
    key: fs.readFileSync(keyFilePath, { encoding: 'utf8' }),
    cert: fs.readFileSync(certFilePath, { encoding: 'utf8' }),
  },
});

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;

server.get('/recipes/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (id !== 42) return res.status(404).json({ message: 'not found' });
  return {
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
  };
});

server.listen(PORT, HOST, () => {
  console.log(`producer runnig at ${HOST}`);
});
