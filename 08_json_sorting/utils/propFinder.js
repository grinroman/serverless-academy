const findIsDone = (obj) => {
   if (obj.isDone !== undefined) {
      return obj.isDone;
   }
   for (const key in obj) {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
         return findIsDone(obj[key]);
      }
   }
};

module.exports = findIsDone;
