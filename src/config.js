'use strict';
 const dotenv = require('dotenv');
 const firebase = require('firebase-admin');
 const assert = require('assert');
 var serviceAccount = require("../addons/service.json");
 dotenv.config();
 
 const {
     PORT,
     HOST,
     HOST_URL,
     API_KEY,
     AUTH_DOMAIN,
     DATABASE_URL,
     PROJECT_ID,
     STORAGE_BUCKET,
     MESSAGING_SENDER_ID,
     APP_ID
 } = process.env;
 
 assert(PORT, 'PORT is required');
 assert(HOST, 'HOST is required');
 
 module.exports = {
     port: PORT,
     host: HOST,
     url: HOST_URL,
     firebaseConfig: {
         apiKey: API_KEY,
         credential: firebase.credential.cert(serviceAccount),
         authDomain: AUTH_DOMAIN,
         databaseURL: DATABASE_URL,
         projectId: PROJECT_ID,
         storageBucket: STORAGE_BUCKET,
         messagingSenderId: MESSAGING_SENDER_ID,
         appId: APP_ID
     }
 }