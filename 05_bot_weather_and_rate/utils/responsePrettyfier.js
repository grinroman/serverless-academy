const { weekDays, mounthNames } = require('../mocks/calendar');

let currentWeekDayIndex = 0;

const prettifyWeatherResponse = (weatherData, interval) =>
   weatherData.list.reduce((acc, item, index) => {
      if (Number(new Date(item.dt_txt).getDay()) !== currentWeekDayIndex) {
         const mounthIndex = Number(item.dt_txt.split('-')[1]);
         const dayIndex = item.dt_txt.split('-')[2].split(' ')[0];

         currentWeekDayIndex = new Date(item.dt_txt).getDay();

         acc += `\n🗓 ${weekDays[currentWeekDayIndex]}, ${dayIndex} of ${
            mounthNames[mounthIndex - 1]
         }\n`;
      }

      if (interval !== 6 || index % 2 === 0)
         acc += `🕔${item.dt_txt.split(' ')[1].slice(0, 5)}, 🌡${Math.round(
            item.main.temp - 270.15
         )}°C, feels like ${Math.round(item.main.feels_like - 270.15)}°C, ${
            item.weather[0].description
         }\n`;

      return acc;
   }, '');

const prettifyCurrencyResponse = (data, currency) => {
   const currencyObject = data.filter((el) => el.ccy === currency)[0];
   currency = currency.toUpperCase();
   return `Rate for ${currency}
💳 Buy: ${Number(currencyObject.buy).toFixed(2)}
💵 Sale: ${Number(currencyObject.sale).toFixed(2)}`;
};

module.exports = { prettifyWeatherResponse, prettifyCurrencyResponse };
