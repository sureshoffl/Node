const Joi = require('joi');
const authController = require('../controller/authController');
const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send('NodeJS Started')
})



router.post('/login',authController.login);

router.post('/addUser',authController.adduser)

router.post('/product', authController.createProduct);

router.get('/read', authController.readProduct);

router.put('/update', authController.updateProduct)

router.delete('/delete', authController.removeproduct)

module.exports = router;