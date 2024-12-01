import * as winston from 'winston';

const customLevels = {
  levels: { error: 0, warn: 1, info: 2, debug: 3, verbose: 4 },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
    verbose: 'cyan',
  },
};

console.log(customLevels);

export const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize({ all: true /** colors: customLevels.colors  */ }),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, context }) => {
      return `${timestamp} [${level}] ${context ? `[${context}] ` : ''}${message}`;
    }),
  ),
});
