const readline = require('readline');

const commandList = require('./mocks/commandList');

const linePrettyfier = (line) => line.replace(/\s\s+/g, ' ').split(' ');

const showHelp = () => {
   commandList.forEach((value, key) => {
      console.log(`${key}: ${value.description}`);
   });
   console.log();
};

let rl = readline.createInterface(process.stdin, process.stdout);

function cliAppFlow() {
   return new Promise(function (resolve) {
      showHelp(commandList);

      rl.setPrompt('enter a string to perform the operation> ');
      rl.prompt();

      rl.on('line', (line) => {
         if (line.trim() === 'exit') {
            rl.close();
            return;
         }

         line = linePrettyfier(line);

         rl.question(`enter required command> `, (command) => {
            command = command.trim();

            if (command === 'exit') {
               rl.close();
               return;
            }

            if (commandList.has(command)) {
               console.log(`\n${commandList.get(command).handler(line)}\n`);
            } else {
               console.log('unhandeled command! try again!');
            }

            showHelp(commandList);

            rl.prompt();
         });
      }).on('close', function () {
         console.log('Closing sorting app ...');
         resolve('The program was sucessfully executed');
      });
   });
}

(async function run() {
   try {
      let replResult = await cliAppFlow();
      console.log(replResult);
   } catch (e) {
      console.log('failed:', e);
   }
})();
