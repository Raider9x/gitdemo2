var mysql = require('mysql');


var ds = "u218444395_tiktok.usa";
var con = mysql.createPool({
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: "sql214.main-hosting.eu.",
    user: "u218444395_tiktok",
    password: "123456"
});

var sql = "select * from " +ds+" order by id desc" ;


let arr;


module.exports = function (callback) {
    con.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        // Use the connection
        connection.query(sql, function (error, result) {
            if(error) console.log(error);
            else{
                arr= JSON.parse(JSON.stringify(result));

                //console.log(arr);
                //console.log(arr[5]);
                callback(error,result);

            }

        })
    });
};


