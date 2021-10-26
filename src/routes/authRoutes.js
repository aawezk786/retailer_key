
const express = require('express');
const {addRetailer} = require('../controllers/authController');
const upload = require('../helpers/multer');
const router = express.Router();



router.post('/retailer',
upload.fields([{ name: 'retailer_photo', maxCount: 1 }, { name: 'shop_photo', maxCount: 1 }]),
addRetailer);



module.exports = {
    routes: router
}