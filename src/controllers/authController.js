'use strict';

const firebase = require('../database/index');
const Retailer = require('../database/model/retailer');



const addRetailer = async (req, res, next) => {
    try {
        const data = req.body;
        await firebase.collection('retailers').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).json({
            error : error.message
        });
    }
}


module.exports = {
    addRetailer
}