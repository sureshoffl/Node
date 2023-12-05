const http = require('http');
const dotenv = require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/route');
const mysql = require('mysql');
const app = express();
const cors=require('cors');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//accessing files existing
app.use(express.static('files')); 

// app.use('/',router);
//     app.listen(5000,() => {
//         console.log('Server Listening');
//     } );

// module.exports = app;

app.use('/', router);  

                                                                                    




const getimages = (req,res) => {
    try{
       const {path} = req.params;
       return res.sendfile(path, {root: 'files'})
    }catch(err){
     console.log("error",err)
    }
    return res.send({
     status: false,
     message: "image not found"
    })
 }


 app.get('/uploads//images//:path', getimages)

const PORT = process.env.PORT

app.listen(PORT,() => {
    return console.log('Server is Listening');
});


