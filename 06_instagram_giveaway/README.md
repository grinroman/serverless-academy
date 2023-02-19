# INSTAGRAM GIVEAWAY

> To run the app you just need tu run `node app` command in your terminal

Then you will get infomation about 3 needs of this program:

1. In 1st task, we need to count how many unique users exist within these 20 files. For that, I have used a hash set table that gives me an opportunity to count all the records collecting them in 1 hash set of names. Then I just displayed the count of elements within the hash set.
   To make the program more effective I used async reading of every file. We don't care about the arrangement in wich the program will work for every file

2. In 2nd task, we need to count the number of records that exist in _every_ file of our list of files. For that, I have created an _etalon_ hash set using 1st file. I made it by sync file reader method to be sure that we already have the start point of our _etalon_ hash set to update it then while running async file readers for the other 19 files. As in 1st task, we musn't care about in which order we will update the _etalon_. Then we need to loop the other 19 files. We can do it in an async way cause that the _etalon_ storage will be global for every file reading operation. We don't care which order we will work with in every file.

3. In 3rd task we need to count records that occur in at least 10 files. For that, I created a `uniqueNamesAppearances` object that will treat as the analog of the hash set. Every key in `uniqueNamesAppearances` will be recorded as every record in the file and the value will be the number of occurrences in every file. As ent entry point ``uniqueNamesAppearances` is empty. Then we start the loop to read every file with the next behavior while we read every file:

-  the record does not exist within the `uniqueNamesAppearances` (as key) => then we will add such property in `uniqueNamesAppearances` with number of occurrences value equal to _1_
-  If the record exists within the `uniqueNames` (as key) => then we will increase the number of occurrences of such value by it key prop within `uniqueNames`

As the endpoint, we will have an object that has the list of records with the number of occurrences within all 20 files stored with information on how many times this record was encountered in 20 files.
Then we will just count how many records have encountered value more or equal to 10. It will be the answer.
