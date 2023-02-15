# Primitive database

1. Run app using `node app ` command
2. Now let's add user to our database
   -  Enter the user name.
   -  Select his sex
   -  Enter the user age. In case you will enter NaN program will ask you to retype
3. After you enter the user age this user will be automatically added to txt file
   -  in case `db.txt ` does not exist it will be automatically generated
   -  in case the file is fully empty the structure that imitates `json file` behaviour will be generated
4. After user was added the cli app will suggest you to add one more. Otherwise you cant press
   `ENTER` button and make a choice: 
    - **Y** - the whole db will be listed and you will be able to find the record by it's name. In case program will find it - the record will be displayed. Otherwise user will be informed that there is no such record in current db state.
    - **N** - the app will be closed
