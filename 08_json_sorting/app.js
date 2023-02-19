const endpointList = require('./mocks/endpointList');
const findIsDone = require('./utils/propFinder');

const getOneEndpoint = async (endpointURL) => {
   for (const i = 0; i < 3; i++) {
      let data = await fetch(endpointURL);

      if (data.status === 200) {
         data = await data.json();
         return data;
      }

      if (i === 2 && data.status !== 200) {
         return `[Fail] ${endpointURL}: The endpoint is unavailable`;
      } else if (i === 2 && data.status === 200) {
         data = await data.json();
         return data;
      }
   }
};

(async function () {
   const statusResults = { trues: 0, falses: 0 };

   for (let i = 0; i < 20; i++) {
      const data = await getOneEndpoint(endpointList[i]);
      const status = findIsDone(data);
      if (typeof status !== 'string') {
         if (status) {
            statusResults.trues += 1;
         } else {
            statusResults.falses += 1;
         }

         console.log(`[Success] ${endpointList[i]}: isDone - ${status}`);
      } else {
         console.log(data);
      }
   }
   console.log(`Found True values: ${statusResults.trues},`);
   console.log(`Found False values: ${statusResults.falses},`);
})();
