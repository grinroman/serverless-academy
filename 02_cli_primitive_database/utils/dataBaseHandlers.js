import fs from 'fs';

const dbReaderHandler = (searchName) => {
   if (fs.existsSync('./database/index.txt')) {
      let returnData = fs.readFileSync('./database/index.txt', {
         encoding: 'utf8',
         flag: 'r',
      });

      returnData = JSON.parse(returnData);

      if (searchName) {
         searchName = searchName.toLowerCase();
         const record = returnData.filter(
            (el) => el.name.toLowerCase() === searchName
         )[0];
         console.log(
            record
               ? `The user "${searchName}" was found` +
                    '\n' +
                    JSON.stringify(record)
               : 'the user does not exist within this db!'
         );
      } else {
         console.log(returnData);
      }
   } else {
      console.log(
         'The database does not exist! Please try to write in the DB any record and it will be automatically generated!'
      );
   }
};

const dbWriterHandler = (newUserObject) => {
   let isJustCreatedFlag = false;
   let newData, file_content, position;

   if (!fs.existsSync('./database/index.txt')) {
      fs.writeFileSync('./database/index.txt', '[' + '\n' + ']');
      console.log('DB was created successfully.');
      isJustCreatedFlag = true;
   }

   fs.readFile('./database/index.txt', function read(err, data) {
      if (err) {
         console.log(err.message);
         throw err;
      }

      if (data.length !== 0) {
         newData = isJustCreatedFlag
            ? JSON.stringify(newUserObject)
            : ',\n' + JSON.stringify(newUserObject);

         file_content = data.toString();
         position = file_content.length - 2;

         file_content = file_content.substring(position);
      } else {
         newData = `[
                     ${JSON.stringify(newUserObject)}
                   ]`;
      }

      let file = fs.openSync('./database/index.txt', 'r+');
      let bufferedText = file_content
         ? new Buffer.from(newData + file_content)
         : new Buffer.from(newData);

      fs.writeSync(file, bufferedText, 0, bufferedText.length, position);
      fs.close(file);
   });
};

export default {
   dbReaderHandler,
   dbWriterHandler,
};
