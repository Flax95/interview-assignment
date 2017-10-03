About my solution
---------------------------
In my solution I made the assumption that a 'user' with all his/her attached information is the "unit of data"
to be written to a file and removed from a database.

The program will, given a userID, check if the user is already in the file (userfile.txt), write the user to 
it, if not, check if user is now in file and then delete the user from the database. 
If userfile.txt does not exist when run, it will be created.



Future work
---------------------------
- Rework the system with regard to asynchronicity and callback functions and get rid of any global values.
- Introduce better error handling and in particular handle the reading/checking of files better.



My thougths:
---------------------------
There are clearly some elements of the programme that I am not very proud of. 
I thought, however, that I would attempt to limit myself to the suggested couple of hours of work time
despite the fact that I was new to setting up databases and to I/O handling in Javascript.
 
My first step towards greatly improving the reusability and security of the code would be to do more 
research on Node.JS, its asynchronous elements and callback functions. It would be essential to have proper
use of these and at least avoid the need for workarounds when it comes to making sure a piece of code is
executed prior to some other piece of code.

I would most certainly like to move error handling and communication with the user to for example 
“moveUserToFile()” to keep the smaller, more specific functions as general and reusable as possible. 



Testing the code:
---------------------------
Before running the app.js file ( found in interview-assignment\NodejsConsoleApp1\NodejsConsoleApp1\app.js), it
is necessary to create a MySQL database and edit the database credentials within the con variable in app.js to
fit your database.

The database can be set up and populated within MySQL workbench with help from the modified sqldump 
(interview-assignment\sqldump.sql).

Testcases are included in app.js, but any ID from the database should work.

