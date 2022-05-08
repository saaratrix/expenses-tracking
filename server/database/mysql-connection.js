"use strict";
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "expenses"
});
// It's better to use a pool of connections but there's only 1 user
connection.connect();
/**
 * MySQL query that returns a promise so we can await it instead of a callback.
 * @param {string} sql
 * @param {Array<any>} parameters
 * @return {Promise<MySQLResults | MySQLError>}
 */
function query (sql, parameters) {
    const promise = new Promise(function (res) {
        connection.query(sql, parameters, function (error, results, fields) {
            if (!error) {
                res(results);
            }
            else {
                const resultError = {
                    error: error.message,
                    insertId: -1,
                    changedRows: 0,
                    affectedRows: 0,
                    length: 0
                };
                res(resultError);
            }
        });
    });
    return promise;
};
module.exports = query;
