import * as winston from 'winston';

export const httpTransport = new winston.transports.Http({
  host: 'http://logger-service.com',
  port: 9000,
  path: '/log',
});
