const axios = require('axios');

const url = `https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`;

const getCertainCurrencyRate = async () => {
   try {
      const { data } = await axios.get(url);
      return data;
   } catch (error) {
      console.log(error.message);
      return error.message;
   }
};

module.exports = { getCertainCurrencyRate };
