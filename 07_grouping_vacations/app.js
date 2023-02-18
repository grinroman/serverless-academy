const fs = require('fs');

const jsonConverter = (incomingDataArr) =>
   incomingDataArr.reduce((acc, el) => {
      let indexOfElementWeMutate = acc.findIndex(
         (accEl) => accEl.userName === el.user.name
      );

      if (indexOfElementWeMutate >= 0) {
         acc[indexOfElementWeMutate].vacations.push({
            startDate: el.startDate,
            endDate: el.endDate,
         });
         return acc;
      }
      acc.push({
         userId: el.user._id,
         userName: el.user.name,
         vacations: [{ startDate: el.startDate, endDate: el.endDate }],
      });
      return acc;
   }, []);

let convertedObject = JSON.parse(fs.readFileSync('incomingData.json'));

convertedObject = jsonConverter(convertedObject);

fs.writeFile(
   'output.json',
   JSON.stringify(convertedObject),
   'utf8',
   function (err) {
      if (err) {
         console.log('An error occured while writing JSON Object to File.');
         return console.log(err);
      }

      console.log('JSON file has been saved.');
   }
);
