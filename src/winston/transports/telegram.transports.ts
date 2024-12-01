import * as TelegramLogger from 'winston-telegram';

export const telegramTransports = new TelegramLogger({
  token: process.env.TELEGRAM_TOKEN,
  chatId: +process.env.TELEGRAM_CHAT_ID,
  level: 'info',
  batchingDelay: 200,
  //   formatMessage: (info) => {
  //     return `${info.level} [${info.message}] ${info.level}: ${info.message}${info.metadata ? `\n${info.metadata}` : ''}`;
  //   },
});
