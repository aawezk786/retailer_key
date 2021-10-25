const firebase = require('firebase-admin');
const config = require('../config');
var serviceAccount = require("../../addons/service.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://retailer-fd8bc-default-rtdb.firebaseio.com"
});
// firebase.initializeApp(config.firebaseConfig);

const db = firebase.firestore();
module.exports = db;