import { WinstonModule } from 'nest-winston';
import { consoleTransport } from './transports/console.transports';
import { fileTransports } from './transports/file.transports';
import { mongodbTransport } from './transports/mongodb.transports';

export const winstonLoggerConfig = WinstonModule.createLogger({
  transports: [consoleTransport, ...fileTransports, mongodbTransport /**  telegramTransports, slackTransports*/],
});

export const customMorganFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms';

// Custom Morgan stream for Winston
export const morganStream = {
  write: (message: string) => {
    winstonLoggerConfig.log('info', message.trim());
  },
};
