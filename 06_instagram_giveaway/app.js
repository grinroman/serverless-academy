const fs = require('fs');
const fsp = fs.promises;

const fileNames = [...new Array(20)].map(
   (el, index) => (el = `./store/out${index}.txt`)
);

function uniqueValues() {
   let uniqueValues = new Set();
   const start = new Date();

   let amountOfUniqueRecords;

   Promise.all(
      fileNames.map(async (fileName) => {
         let fileContent = await fsp.readFile(fileName, { encoding: 'utf8' });

         uniqueValues = new Set([...uniqueValues, ...fileContent.split('\n')]);

         amountOfUniqueRecords = uniqueValues.size;
      })
   ).then(() => {
      console.log('Unique usernames: ', amountOfUniqueRecords);
      console.log(
         'Time that was spent for 1st task: ',
         (new Date() - start) / 1000
      );
   });
}

function existInAllFiles() {
   let etalon, etalonSize;
   const start = new Date();

   function intersectionCreator(setA, setB) {
      const result = new Set();

      for (const elem of setA) {
         if (setB.has(elem)) {
            result.add(elem);
         }
      }

      return result;
   }

   try {
      const data = fs.readFileSync('./store/out0.txt', 'utf8');
      etalon = new Set(data.split('\n'));
   } catch (err) {
      console.error(err);
   }

   Promise.all(
      fileNames.map(async (fileName) => {
         let fileContent = await fsp.readFile(fileName, {
            encoding: 'utf8',
         });
         fileContent = new Set(fileContent.split('\n'));

         if (fileName === 'out0.txt') {
            return;
         } else {
            etalon = intersectionCreator(etalon, fileContent);
         }

         etalonSize = etalon.size;
         return;
      })
   ).then(() => {
      console.log('The number of usernames that are in each file', etalonSize);
      console.log(
         'Time that was spent for 2st task: ',
         (new Date() - start) / 1000
      );
   });
}

function existInAtleastTen() {
   let uniqueNamesAppearances = {};
   const start = new Date();

   Promise.all(
      fileNames.map(async (fileName) => {
         let fileContent = await fsp.readFile(fileName, { encoding: 'utf8' });

         fileContent = new Set(fileContent.split('\n'));

         fileContent.forEach((el) => {
            if (!uniqueNamesAppearances[el]) {
               uniqueNamesAppearances[el] = 1;
            } else if (uniqueNamesAppearances[el] >= 0) {
               uniqueNamesAppearances[el] += 1;
            }
         });
      })
   ).then(() => {
      let moreThen10Counter = 0;

      for (const key in uniqueNamesAppearances) {
         if (uniqueNamesAppearances[key] >= 10) moreThen10Counter++;
      }
      console.log(
         'Number of records that exist in at least 10 files',
         moreThen10Counter
      );
      console.log(
         'Time that was spent for 3st task: ',
         (new Date() - start) / 1000
      );
   });
}

uniqueValues();
existInAllFiles();
existInAtleastTen();
