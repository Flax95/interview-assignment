var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "msy75apf",
    database: "userdatabase"
});

var testuser1 = 'E0B725E1-8AE0-4902-3511-87CD679C440D';
var testuser2 = 'C1C63838-729E-7B69-E9BD-B73A94B746A9';
var filepath = 'userfile.txt';
//selectUserFromDatabase('Colon');
writeUserToFile(filepath, testuser2);


//moveUserToFile(filepath, testuser);

//con.connect(function (err) {
//    if (err) throw err;
//    con.query("SELECT * FROM users ORDER BY lastname asc", function (err, result, fields) {
//        if (err) throw err;
//        console.log(result);
//    });
//});

function selectUserFromDatabase(userID) {
    con.connect(function (err) {
        if (err) throw err;
        var sql = "SELECT * FROM users WHERE id = ? ORDER BY lastname asc"
        con.query(sql, [userID], function (err, result, fields) {
            if (err) throw err;
            //console.log(result);
            datatowrite = result;
            data=JSON.stringify(datatowrite);
            return data;
        });
    });
}

//function filewriter(filepath, content) {

//}

function writeUserToFile(filepath, userID) {
    data = selectUserFromDatabase(userID);
    UserExistInFile = checkFileForUser(filepath, userID);
    console.log("User isn't in file before setTimeout: " + UserExistInFile);
    setTimeout(function () {
        console.log("User is in file: " + UserExistInFile);
        if (UserExistInFile == false) {
            console.log(data);
            fs.appendFile(filepath, data, function (err) {
                if (err) throw err;
                console.log("Wrote user to file");  //DELETE THIS PLEASE
                return true;
            });
        } else {
            console.log("Did not write to file");  //DELETE THIS PLEASE
        }
    }, 2000);
    
}

//function filereader(filepath) {

//}

function checkFileForUser(filepath, userID) {
    if (fs.exists(filepath)) {
        fs.readFile(filepath, function (err, data) {
            if (err) {
                console.log("ERROR");
                return true;
            }

            userExists = (data.indexOf(userID) >= 0);
            setTimeout(function () {            //Remove setTimeout if possible
                console.log("The user already exists: " + userExists);
                return userExists
                console.log("But somehow I get here");
            }, 2000)
        })
    }

        console.log("File does not exist");
        return false;
}

function deleteUserFromDatabase(userID) {
    con.connect(function (err) {
        if (err) throw err;
        var sql = "DELETE FROM users WHERE id = ?";
        con.query(sql, [userID], function (err, result) {
            if (err) throw err;
        });
    });
}

function moveUserToFile(filepath, userID) {
        writeUserToFile(filepath, userID)

        if (checkFileForUser(filepath, userID)) {
            deleteUserFromDatabase(userID);
        } else {
            console.log("Error writing user to file");
        }
}