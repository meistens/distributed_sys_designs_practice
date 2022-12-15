#!/usr/bin/env node
// for now, use const but setup es6 use later
const server = require('express');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
const app = server();

console.log(`worker pid=${process.pid}`);

app.get('/server/:id', async (req, res) => {
  console.log(`worker request pid=${process.pid}`);
  const id = Number(req.params.id);
  if (id !== 42) {
    return res.status(404).json({ error: 'not found' });
  }
  return {
    producer_pid: process.pid,
    recipe: {
      id,
      name: 'testing',
      steps: 'do whatever',
      stuff: [
        { id: 1, name: 'wow' },
        { id: 2, name: 'just wow' },
      ],
    },
  };
});

app.listen(PORT, HOST, () => {
  console.log(`server_basic runing on ${HOST}:${PORT}`);
});
