# JSON SORTING

> To run the app just print `node app`

Then you will receive data from 20 endpoints with information about the status of education of every user (every user, in this case, is just an object that we can receive by every specific endpoint)

You will receive data 1 after 1 (queries will run sequentially) - so fetching imitates sync behavior.
There are 2 cases:
- we receive a response with the status code ```200```. Then we just run the function to find the ```isDone``` prop in the object and then get its value
- we receive a response with __another__ status code that leads that something going wrong. In such case, we will make an attempt to retrieve the fetching by this URL 2 more times. If in the last time, we will get an error again we will message the user about that.
