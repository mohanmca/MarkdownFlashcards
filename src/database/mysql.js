var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodejs"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "create table emp(id BIGINT NOT NULL,Name VARCHAR(10))";
    con.query(sql, function(err) {
        if (err) throw err;
        console.log("created table");
    });
});