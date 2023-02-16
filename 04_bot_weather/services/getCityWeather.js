const axios = require('axios');
const { WEATHER_API_KEY } = require('../env');

const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
const lat = 47.54;
const lon = 33.2;
const apiKey = '05e98c3418f230712dc3b175ddcafc75';
const url = `${baseUrl}lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

const getWeatherData = async () => {
   try {
      const { data } = await axios.get(url);
      return data;
   } catch (error) {
      console.log(error.message);
      return error.message;
   }
};
module.exports = { getWeatherData };
