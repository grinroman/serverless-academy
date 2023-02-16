const { BOT_TOKEN, CHAT_ID } = require('./env');

const { Command } = require('commander');
const program = new Command();

const TelegramApi = require('node-telegram-bot-api');

const _fileOptions = {
   filename: 'photo',
   contentType: 'image/png',
};

const bot = new TelegramApi(BOT_TOKEN, { polling: true });

program
   .command('m')
   .description('Sends a message to telegram')
   .argument('<message>', 'string you want to send to telegram')
   .action(async (textMessage) => {
      await bot.sendMessage(CHAT_ID, textMessage);
      process.exit();
   });

program
   .command('p')
   .description('Sends a photo to telegram')
   .argument(
      '<path>',
      'path to the photo in your pc you want to send'
   )
   .action(async (srcToPhoto) => {
      await bot.sendPhoto(CHAT_ID, srcToPhoto, {}, _fileOptions);
      process.exit();
   });

program.parse();
