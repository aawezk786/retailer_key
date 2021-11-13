const firebase = require('firebase-admin');
const config = require('../config');

firebase.initializeApp(config.firebaseConfig);

const db = firebase.firestore();
module.exports = {db ,firebase};