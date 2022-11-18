const firebase = require('firebase-admin');
const config = require('./config');

//const db = firebase.initializeApp(config.firebaseConfig);
var serviceAccount = require("C:/Users/khali/OneDrive/Documents/testFirebase/serviceAccountKey.json");

const db = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://testfirebase-2c027-default-rtdb.firebaseio.com"
});

module.exports = db;