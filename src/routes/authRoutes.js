
const express = require('express');
const {addRetailer, 
      } = require('../controllers/authController');

const router = express.Router();

router.post('/retailer', addRetailer);



module.exports = {
    routes: router
}