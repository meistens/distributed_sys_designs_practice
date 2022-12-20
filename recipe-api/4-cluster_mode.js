#!/usr/bin/env node
const cluster = require('cluster')
console.log(`master pid=${process.pid}`)

cluster.setupMaster({
  exec: __dirname+'/1-server_basic.js' // override default entry to here
})
cluster.fork();
cluster.fork()
// create 2 workers
cluster.on('disconnect', (worker) => {
  console.log('disconnect', worker.id)
}).on('exit', (worker, code, signal) => {
  // cluster.fork()
  // uncomment to make them hard to kill
}).on('listening', (worker, { address, port}) => {
  console.log('listening', 'worker.id', `${address}:${port}`)
})
