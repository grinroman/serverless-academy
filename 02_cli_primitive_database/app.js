import inquirer from 'inquirer';

import handlers from './utils/dataBaseHandlers.js';

const cancel = ' To cancel press ENTER';

const questions = [
   {
      type: 'input',
      name: 'name',
      message: "Enter the user's name." + cancel,
      
   },
   {
      type: 'list',
      name: 'gender',
      message(answers) {
         return `Choose gender for ${answers.name}`;
      },
      choices: ['male', 'female'],
      when(answers) {
         return !!answers.name.replaceAll(' ', ''); // run if input is NOT enter
      },
   },
   {
      type: 'input',
      name: 'age',
      message(answers) {
         return `$Enter age for ${answers.name}. ${cancel}`;
      },
      when(answers) {
         return !!answers.name.replaceAll(' ', ''); // run if input is NOT enter
      },
      validate(answer) {
         return isNaN(answer) ? 'Enter just a number' : true;
      },
   },
   {
      type: 'confirm',
      name: 'is_db_search',
      message: 'Do you want search values in DB?',
      when(answers) {
         return (
            !answers.name.replaceAll(' ', '') ||
            !answers.age.replaceAll(' ', '')
         );
      },
   },
   {
      type: 'input',
      name: 'searchpattern',
      message: 'Enter the user name you want to find',
      when(answers) {
         if (answers.is_db_search) {
            handlers.dbReaderHandler();
         }
         return answers.is_db_search;
      },
   },
];

(function runApp() {
   return inquirer
      .prompt(questions)
      .then((answers) => {
         if (answers.is_db_search !== undefined) {
            if (answers.is_db_search) {
               handlers.dbReaderHandler(answers.searchpattern);
            }
            return;
         } else if (answers.name && answers.gender && answers.age) {
            handlers.dbWriterHandler(answers);
            return runApp();
         } else {
            return runApp();
         }
      })
      .catch((error) => {
         if (error.isTtyError) {
            console.log('Your console environment is not supported!');
         } else {
            console.log(error);
         }
      });
})();
