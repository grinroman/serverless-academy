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
   for (let i = 0; i < 20; i++) {
      const data = await getOneEndpoint(endpointList[i]);
      if (typeof data === 'object') {
         console.log(
            `[Success] ${endpointList[i]}: isDone - ${findIsDone(data)}`
         );
      } else {
         console.log(data);
      }
   }
})();
