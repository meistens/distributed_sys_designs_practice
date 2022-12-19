#!/usr/bin/env node
const server = require('express')();
const fetch = require('node-fetch');
const HOST = '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || 'localhost:4000';

const complex_query = `query kitchenSink ($id:ID) {
recipe(id: $id) {
id name
ingredients {
name quantity
}
}
pid
}`;

server.get('/', async (req, res) => {
  const reqt = await fetch(`http://${TARGET}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: complex_query,
      variables: { id: '42' },
    }),
  });
  // hardcoded value will return null. For whatever reason, do things the way it is on node-fetch docs(using express as a server should be a red flag on its own, since fetch can be used standalone to communicate with the producer), other than that, it works

  return res.status(200).json({
    consumer_pid: process.pid,
    producer_data: await reqt.json(),
  });
});

server.listen(PORT, HOST, () => {
  console.log(`consumer running at http://${HOST}:${PORT}/`);
});
