const Joi = require('joi');
const authController = require('../controller/authController');
const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path  = require('path');
const upload = require('../upload');
const mailservice = require('../config/mailservice')
const verifyToken = require("../middleware/auth");
const auth = require('../middleware/logauth');
const refreshToken = require('../middleware/refreshauth');
const newtoken = require('../middleware/newtoken');
const logverifyToken = require('../middleware/logauth');
router.get('/', (req, res)=>{
    res.send('NodeJS Started')
})



router.post('/login',authController.login);

router.post('/addUser',authController.adduser)

router.post('/product', authController.createProduct);

router.get('/read', verifyToken , authController.readProduct);

router.put('/update', authController.updateProduct);

router.delete('/delete', authController.removeproduct);

router.post('/fileupload', upload.single('file'), authController.fileupload);



router.get('/fileview', authController.fileview);

router.post('/sendmail', authController.sendingmail)
// router.get("/", express.static(path.join(__dirname, "./files")));




// router.post("/upload", upload.single('file'), (req, res) => {
//     const { file } = req.file
//     if (!file) {
//         console.log("No file upload");
//     } else {
//         console.log(req.file.filename)
//         var imgsrc = req.file.filename
//         var insertData = db('file').insert(name)
//         db.query(insertData, [imgsrc], (err, result) => {
//             if (err) throw err
//             console.log("file uploaded")
//         })
//     }
// });


//Queries INNER JOIN

router.get('/innerjoin',  refreshToken, authController.innerjoin);

//Queries LEFT JOIN 

router.get('/leftjoin', auth, authController.leftjoin);

//Employee Salary
router.get('/employeesalary', refreshToken,  authController.salary);

//ShowEmployee
router.get('/employee', authController.employee);

//Employee Info
router.get('/employeeinfo', authController.info);

//addemployee
router.post('/addemployee', authController.addemployee);

//Right Join
router.get('/rightjoin', authController.rightjoin);

//fulljoin
router.get('/fulljoin', authController.fulljoin);

//crossjoin
router.get('/crossjoin', authController.crossjoin);

//selfjoin
router.get('/selfjoin', authController.selfjoin);

//min
router.get('/selfjoin', authController.queries);

//queries
router.get('/queries', authController.queries)

//Case Statement
router.get('/case', authController.case);


//fetching date between
router.get('/date', authController.date);

//rank
router.get('/rank', authController.rank);

//denserank
router.get('/denserank', authController.denserank)

router.get('/query', authController.highestsalary)

router.get('/query1', authController.query1);

router.get('/query2', authController.query2);

router.get('/query3', authController.query3);

router.get('/query4', authController.query4);

router.get('/duplicate', authController.duplicate);

router.get('/signin',  authController.signin);

module.exports = router;