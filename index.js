const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/route');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/',router);
//     app.listen(5000,() => {
//         console.log('Server Listening');
//     } );

// module.exports = app;

app.use('/', router);
app.listen(8000,() => {
    return console.log('Server is Listening');
});


