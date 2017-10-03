var mysql = require('mysql');
var fs = require('fs');
var UserExists = true;

//Testcases
var testuser1 = 'E0B725E1-8AE0-4902-3511-87CD679C440D'; //Igor Acosta
var testuser3 = 'F5D51671-5FC7-F38C-136D-3A5A8DF253AE'; //Dovle
var testuser2 = 'C1C63838-729E-7B69-E9BD-B73A94B746A9'; //Lee burns
var filepath = 'userfile.txt';

//Establish connection to database with database credentials
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "msy75apf",
    database: "userdatabase"
});


moveUserToFile(filepath, testuser2);



//Returns user as JSON string
function selectUserFromDatabase(userID) {
    var sql = "SELECT * FROM users WHERE id = ? ORDER BY lastname asc"
    con.query(sql, [userID], function (err, result, fields) {
        if (err) throw err;
        datatowrite = result;
        data = JSON.stringify(datatowrite);
        return data;
    });
}

//Gets user from ID, checks if user is already in file, writes it to it if not.
function writeUserToFile(filepath, userID) {
    data = selectUserFromDatabase(userID);
    userExistInFile = checkFileForUser(filepath, userID);
    setTimeout(function () {
        someString = JSON.stringify(data);
        if (someString.length > 4) {
            console.log("User exist in file: " + UserExists);
            if (UserExists == false) {
                fs.appendFile(filepath, data + "\r\n", function (err) {
                    if (err) throw err;
                    console.log("Wrote user with ID: " + userID + " to file");  //DELETE THIS PLEASE
                    UserExists = true;
                    return true;
                });
            } else {
                console.log("Did not write to file");  //DELETE THIS PLEASE
            }
        } else {
            console.log("No user with ID: " + userID  +  " was found on the database.");
        }
    }, 1000);
}

//Returns true if the user exists in file, false if it doesn't or file doesn't exist
function checkFileForUser(filepath, userID) {
    var userWasFound = true;
    fs.readFile(filepath, function (err, data) {
        if (err) {
            UserExists = false
        } else if (UserExists) {
            userWasFound = (data.indexOf(userID) >= 0);
            UserExists = userWasFound;
        }      
            
    })
    return UserExists;
 }
    
function deleteUserFromDatabase(userID) {
    var sql = "DELETE FROM users WHERE id = ?";
    con.query(sql, [userID], function (err, result) {
        if (err) throw err;
    });
}

//Main function, checks if user is already in file, writes it to it if not, checks if user is now in file and then deletes user from database.
function moveUserToFile(filepath, userID) {
        writeUserToFile(filepath, userID)

        if (checkFileForUser(filepath, userID)) {
            deleteUserFromDatabase(userID);
        }
}