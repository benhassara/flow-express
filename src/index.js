// @flow
'use strict'
import http from 'http';
import debug from 'debug';
import Api from './Api';
import type {ErrnoError} from './util/types';

const logger = debug('flow-api:startup');
const app: Api = new Api();
const DEFAULT_PORT: number = 3000;
const port: string | number = normalizePort(process.env.PORT);
// $FlowFixMe: express libdef issue
const server: Server = http.createServer(app.express);

app.express.set('port', port);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: any): number | string {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;

  if (port && isNaN(port)) return port;
  else if (port >= 0) return port;
  else return DEFAULT_PORT;
}

function onError(error: ErrnoError): void {
  if (error.syscall !== 'listen') throw error;
  let bind: string = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port.toString()}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr: string = server.address();
  let bind: string = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  logger(`Listening on ${bind}`);
}
