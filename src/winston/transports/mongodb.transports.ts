import * as winston from 'winston';
import 'winston-mongodb';

export const mongodbTransport = new winston.transports.MongoDB({
  db: process.env.MONGO_LOG_URL,
  collection: 'app_logs',
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
});
