'use strict';

const {db,firebase} = require('../database/index');
const Retailer = require('../database/model/retailer');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require("uuid");
require('firebase/storage')
global.XMLHttpRequest = require("xhr2");

const addRetailer = async (req, res, next) => {
    try {
        let retailerUrl;
        let shopUrl;
        const bucket = firebase.storage().bucket();
        if(req.files.retailer_photo){
            const bucketFile = bucket.file(`retailer/${req.body.phoneNumber}-retailer-${uuidv4()}`)
            bucketFile.save(req.files.retailer_photo[0].buffer,{
                contentType: req.files.retailer_photo[0].mimetype,
                gzip: true
              })
             retailerUrl = await bucketFile.getSignedUrl({
                action: "write",
                expires: "01-01-2080"
              });
        }
        if(req.files.shop_photo){
            const bucketFile = bucket.file(`shop/${req.body.phoneNumber}-shop-${uuidv4()}`)
            bucketFile.save(req.files.shop_photo[0].buffer,{
                contentType: req.files.shop_photo[0].mimetype,
                gzip: true
              })
              shopUrl = await bucketFile.getSignedUrl({
                action: "write",
                expires: "01-01-2080"
              });
        } 
        console.log(req.files)
        let hashedPassword;
        const salt = await bcrypt.genSalt(12);
        hashedPassword = await bcrypt.hash(req.body.password, salt);
        const data = {
            name : req.body.name,
            phoneNumber : req.body.phoneNumber,
            email : req.body.email,
            password : hashedPassword,
            shopName : req.body.shopName,
            shopAddress : req.body.shopAddress,
            retailer_photo : retailerUrl[0] ? retailerUrl[0] : "",
            shop_photo : shopUrl[0] ? shopUrl[0] : "",
            dob : req.body.dob,
            gender : req.body.gender,
            pan_no : req.body.pan_no,
            aadhaar_no : req.body.aadhaar_no
        };
        await db.collection('retailers').doc().set(data);
        res.status(201).json({
            statusCode : 201,
            message : "Record saved successfuly",
            data : data
        });
    } catch (error) {
      next(error)
    }
}

const loginRetailer = async (req, res, next) => {
    try {
        let hashedPassword;
        const salt = await bcrypt.genSalt(12);
        hashedPassword = await bcrypt.hash(req.body.password, salt);
        await db.collection('retailers').doc().set(data);
        res.status(201).json({
            statusCode : 201,
            message : "Record saved successfuly",
            data : data
        });
    } catch (error) {
      next(error)
    }
}



module.exports = {
    addRetailer
}