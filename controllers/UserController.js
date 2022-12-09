'use strict';

const { openDelimiter } = require('ejs');
const firebase = require('../db');
const User = require('../models/User');
const firestore = firebase.firestore();



const addUser = async (req, res, next) => {
    try {
        /*
        * print req, then try printing req.body to see the format
        */
        
        /*
        *  create a document in firebase using your firestor 'user' collection (I don't expect you to know the command. Here it isawait firestore.collection(/* the collection that you are creating the document in */).doc().set(/* the body of the request */);)
        */
    }
    catch (error) {
        console.log(error.message);
        //res.status(400).send(error.message);
    }
};


module.exports = {
    addUser
}
