const Joi = require('joi');
const authController = require('../controller/authController');
const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path  = require('path');
const upload = require('../upload');
const mailservice = require('../config/mailservice')
const auth = require("../middleware/auth");
const refreshauth = require('../middleware/refreshauth');
const logauth = require('../middleware/logauth');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const authent = require('../middleware/authent')
const authService = require('../service/authService')
const token = require('../middleware/token')

router.get('/', (req, res)=>{
    res.send('NodeJS Started')
})

router.post('/login',authController.login);

router.post('/addUser',authController.adduser)

router.post('/product', authController.createProduct);

router.get('/read', auth,  authController.readProduct);

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

router.get('/innerjoin', authent, authController.innerjoin);

//Queries LEFT JOIN 

router.get('/leftjoin', logauth, authController.leftjoin);

//Employee Salary
router.get('/employeesalary', authController.salary);

//ShowEmployee
router.get('/employee', authController.employee);

//Employee Info
router.get('/employeeinfo', refreshauth, authController.info);

//addemployee
router.post('/addemployee', logauth, authController.addemployee);

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

router.post('/refreshtoken', authService.refreshToken)
// router.post('/refresh', (req, res)=>{
//     var refreshToken = req.headers['refreshtoken']
//     if(!refreshToken) {
//         return res.send('no token provided')
//     }
//     try {
//         const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY)
//         const accessToken = jwt.sign({ user: decoded.user }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' })
//         console.log("accessToken", accessToken)
//         res.send({
//  message : accessToken            
//         })
//       res.send('access' , accessToken)
//         //console.log('decoded', decoded)
//         console.log(refresh);
//     } catch (error) {
//         res.send('invalid token ')
//         console.log(error);
//     }
// })
   

module.exports = router;