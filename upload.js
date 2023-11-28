const multer = require('multer');
const fs = require('fs');
const path = require('path');


//! Use of Multer
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'files')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
});

module.exports = upload;