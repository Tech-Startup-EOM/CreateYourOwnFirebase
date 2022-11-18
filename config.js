'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const{
    PORT,
    HOST,
    HOST_URL,
    API_KEY,
    AUTH_DOMAIN,
    //DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGIN_SENDER_ID,
    APP_ID
} = process.env;

assert(PORT, 'port is required');
assert(HOST, 'host is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        //databaseURL: DATABASE_URL,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGIN_SENDER_ID,
        appId: APP_ID,
    }
}