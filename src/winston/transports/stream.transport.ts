import fs from 'fs';
import * as winston from 'winston';

const fileStream = fs.createWriteStream('logfile.log');
new winston.transports.Stream({
  stream: fileStream,
});
