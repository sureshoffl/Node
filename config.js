const knex = require('knex');

const connection = {
    client : 'mysql',
    connection : {
    host : 'localhost',
    user : 'root',
    password : '', 
    database : 'authdb'
    },
    debug : false
}

db = knex(connection);

module.exports = db;