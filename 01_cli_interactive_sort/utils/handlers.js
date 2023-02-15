//messages
const message = {
   noString: 'please, input at least one none-string element!',
   noNumbers: 'please, input at least one number!',
};

//enhancers
const numbersOnly = (incomingString) =>
   incomingString.filter(Number).map((el) => Number(el));

const stringsOnly = (incomingString) =>
   incomingString.filter((el) => isNaN(el));

const isEmpty = (incomingArray) => incomingArray.length === 0;

//actions
const sortStringsAlphabetOrder = (incomingString) => {
   incomingString = stringsOnly(incomingString);

   if (isEmpty(incomingString)) return message.noString;
   return incomingString.sort();
};
const sortNumbersAscendingOrder = (incomingString) => {
   incomingString = numbersOnly(incomingString);

   if (isEmpty(incomingString)) return message.noNumbers;
   return incomingString.sort((a, b) => a - b);
};

const sortNumbersDescendingOrder = (incomingString) => {
   incomingString = numbersOnly(incomingString);

   if (isEmpty(incomingString)) return message.noNumbers;
   return incomingString.sort((a, b) => -a + b);
};

const sortStringSymbolsNumberAscending = (incomingString) => {
   incomingString = stringsOnly(incomingString);

   if (isEmpty(incomingString)) return message.noString;
   return incomingString.sort((a, b) => a.length - b.length);
};

const uniqueWords = (incomingString) => {
   incomingString = stringsOnly(incomingString);

   if (isEmpty(incomingString)) return message.noString;
   return Array.from(new Set(incomingString)).join(' ');
};

const uniqueAnything = (incomingString) => {
   if (isEmpty(incomingString)) return message.noString;
   return Array.from(new Set(incomingString)).join(' ');
};

const showHelp = () => 'to exit app enter exit';

module.exports = {
   sortStringsAlphabetOrder,
   sortNumbersAscendingOrder,
   sortNumbersDescendingOrder,
   sortStringSymbolsNumberAscending,
   uniqueWords,
   uniqueAnything,
   showHelp,
};
