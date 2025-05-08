#!/usr/bin/env node

<<<<<<< HEAD
<<<<<<<< HEAD:src/bin/www.ts
=======
>>>>>>> ea0a97fd5f673a424b495d758d1ac6840c8a18da
import app from '../app';
import debugLib from 'debug';
import http from 'http';

const debug = debugLib('mi-proyecto:server');
<<<<<<< HEAD
========
/**
 * Module dependencies.
 */
const app = require('../server'); // Asegúrate de que apunte a tu archivo server.js
const http = require('http');
>>>>>>>> ea0a97fd5f673a424b495d758d1ac6840c8a18da:bin/www
=======
>>>>>>> ea0a97fd5f673a424b495d758d1ac6840c8a18da

/**
 * Get port from environment and store in Express.
 */
<<<<<<< HEAD
<<<<<<<< HEAD:src/bin/www.ts
const port = normalizePort(process.env.PORT || '3002');
========
const port = normalizePort(process.env.PORT || '3000');
>>>>>>>> ea0a97fd5f673a424b495d758d1ac6840c8a18da:bin/www
=======
const port = normalizePort(process.env.PORT || '3003');
>>>>>>> ea0a97fd5f673a424b495d758d1ac6840c8a18da
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
<<<<<<< HEAD
<<<<<<<< HEAD:src/bin/www.ts
function normalizePort(val: string): number | string | false {
========
function normalizePort(val) {
>>>>>>>> ea0a97fd5f673a424b495d758d1ac6840c8a18da:bin/www
=======
function normalizePort(val: string): number | string | false {
>>>>>>> ea0a97fd5f673a424b495d758d1ac6840c8a18da
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
<<<<<<< HEAD
<<<<<<<< HEAD:src/bin/www.ts
function onError(error: NodeJS.ErrnoException): void {
========
function onError(error) {
>>>>>>>> ea0a97fd5f673a424b495d758d1ac6840c8a18da:bin/www
=======
function onError(error: NodeJS.ErrnoException): void {
>>>>>>> ea0a97fd5f673a424b495d758d1ac6840c8a18da
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
<<<<<<< HEAD
<<<<<<<< HEAD:src/bin/www.ts
=======
>>>>>>> ea0a97fd5f673a424b495d758d1ac6840c8a18da
function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  debug('Listening on ' + bind);
<<<<<<< HEAD
}
========
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

import app from '../src/app';
>>>>>>>> ea0a97fd5f673a424b495d758d1ac6840c8a18da:bin/www
=======
}
>>>>>>> ea0a97fd5f673a424b495d758d1ac6840c8a18da
