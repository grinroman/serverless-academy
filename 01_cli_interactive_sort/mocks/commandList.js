const {
   sortStringsAlphabetOrder,
   sortNumbersAscendingOrder,
   sortNumbersDescendingOrder,
   sortStringSymbolsNumberAscending,
   uniqueWords,
   uniqueAnything,
   showHelp,
} = require('../utils/handlers');

const commandList = new Map([
   [
      'a',
      {
         description: 'Sort words alphabetically',
         handler: sortStringsAlphabetOrder,
      },
   ],
   [
      'b',
      {
         description: 'Show numbers from lesser to greater',
         handler: sortNumbersAscendingOrder,
      },
   ],
   [
      'c',
      {
         description: 'Show numbers from bigger to smaller',
         handler: sortNumbersDescendingOrder,
      },
   ],
   [
      'd',
      {
         description:
            'Display words in ascending order by number of letters in the word',
         handler: sortStringSymbolsNumberAscending,
      },
   ],
   [
      'e',
      {
         description: 'Show only unique words',
         handler: uniqueWords,
      },
   ],
   [
      'f',
      {
         description:
            'Display only unique values from the set of words and numbers entered by the     user',
         handler: uniqueAnything,
      },
   ],
   [
      'g',
      {
         description: 'Repeat the input / exit',
         handler: showHelp,
      },
   ],
]);

module.exports = commandList;
