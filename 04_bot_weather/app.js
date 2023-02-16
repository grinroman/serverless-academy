const TelegramBot = require('node-telegram-bot-api');

const { getWeatherData } = require('./services/getCityWeather');
const { prettifyWeatherResponse } = require('./utils/responsePrettyfier');

const token = '5973509735:AAEixLJuFQraqC5f2eSOp1co6LbFLVFfkao';

const bot = new TelegramBot(token, { polling: true });

const main_menu = {
   reply_markup: {
      keyboard: [['Forecast in Krivij Rih']],
   },
};

const weather_options = {
   reply_markup: {
      keyboard: [
         [
            'Send with an interval of 3 hours',
            'Send with an interval of 6 hours',
         ],
         ['Return to main menu'],
      ],
   },
};

bot.on('message', async (msg) => {
   const chatId = msg.chat.id;

   switch (msg.text) {
      case 'Return to main menu': {
         bot.sendMessage(chatId, 'Select the option!', main_menu);
         break;
      }

      case 'Forecast in Krivij Rih': {
         bot.sendMessage(
            chatId,
            'Please, choose the interval in wich you want to recieve the weather!',
            weather_options
         );
         break;
      }
      case 'Send with an interval of 3 hours': {
         const data = await getWeatherData();
         bot.sendMessage(
            chatId,
            prettifyWeatherResponse(data),
            weather_options
         );

         break;
      }
      case 'Send with an interval of 6 hours': {
         const data = await getWeatherData();
         bot.sendMessage(
            chatId,
            prettifyWeatherResponse(data, 6),
            weather_options
         );
         break;
      }

      default: {
         if (msg.text !== '/start')
            bot.sendMessage(
               chatId,
               'Command was not detected. Please, try again!',
               weather_options
            );
         break;
      }
   }
});

bot.onText(/\/start/, function (msg) {
   bot.sendMessage(msg.chat.id, 'Click to the weather option:', main_menu);
});
