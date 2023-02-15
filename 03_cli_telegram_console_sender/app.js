const { Command } = require('commander');
const program = new Command();

const TelegramApi = require('node-telegram-bot-api');

const _token = '6074253125:AAGLA8N0a7sDOZ7yA6aF4r9Tlo1DbeBMm20';

const _fileOptions = {
   filename: 'photo u send to telegram',
   contentType: 'image/png',
};

const bot = new TelegramApi(_token, { polling: true });

program
   .command('m')
   .description('Sends a message to telegram')
   .argument('<message>', 'string you want to send to telegram')
   .action((textMessage) => {
      bot.on('message', async (message) => {
         const _chatId = message.chat.id;

         console.log(_chatId);

         console.log('Sending MESSAGE to telegram: ' + textMessage);

         await bot.sendMessage(_chatId, textMessage, {}, _fileOptions);

         process.exit();
      });
   });

program
   .command('p')
   .description('Sends a photo to telegram')
   .argument(
      '<path>',
      'path to the photo in your local machine you want to send'
   )
   .action((srcToPhoto) => {
      bot.on('message', async (message) => {
         const _chatId = message.chat.id;

         console.log(_chatId);

         console.log('Sending MESSAGE to telegram: ' + srcToPhoto);

         await bot.sendPhoto(_chatId, srcToPhoto);
         process.exit();
      });
   });

program.parse();
