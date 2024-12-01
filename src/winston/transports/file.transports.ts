import * as winston from 'winston';
import 'winston-daily-rotate-file';

const createFileTransport = (level: string) =>
  new winston.transports.DailyRotateFile({
    level: level,
    dirname: `logs/${level}`,
    filename: `${level}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    zippedArchive: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json(),
    ),
  });

const infoFileTransport = createFileTransport('info');

// file lifecycle method

infoFileTransport.on('new', (filename: string) => {
  console.log('new info log file transport....', filename);
});

infoFileTransport.on('rotate', (filename: string) => {
  console.log('Rotate info file transport....', filename);
});

infoFileTransport.on('archive', (filename: string) => {
  console.log('Rotate info file transport....', filename);
});

const errorFileTransport = createFileTransport('error');
const warnFileTransport = createFileTransport('warn');

export const fileTransports = [infoFileTransport, errorFileTransport, warnFileTransport];
