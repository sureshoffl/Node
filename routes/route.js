const Joi = require('joi');
const authController = require('../controller/authController');
const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path  = require('path');
const upload = require('../upload');
router.get('/', (req, res)=>{
    res.send('NodeJS Started')
})



router.post('/login',authController.login);

router.post('/addUser',authController.adduser)

router.post('/product', authController.createProduct);

router.get('/read', authController.readProduct);

router.put('/update', authController.updateProduct);

router.delete('/delete', authController.removeproduct);

router.post('/fileupload', upload.single('file'), authController.fileupload);





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

module.exports = router;