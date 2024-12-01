import { format } from 'winston';
import * as SlackHook from 'winston-slack-webhook-transport';

export const slackTransports = new SlackHook({
  webhookUrl: process.env.SLACK_WEBHOOK_URL,
  channel: '#log-message',
  username: process.env.SLACK_USERNAME,
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message, context, trace }) => {
      return `${timestamp} [${context}] ${level}: ${message}${trace ? `\n${trace}` : ''}`;
    }),
  ),
});
