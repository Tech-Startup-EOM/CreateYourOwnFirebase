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
        *  create a document in firebase using your firestor 'user' collection (I don't expect you to know the command. Here it is: await firestore.collection(/* the collection that you are creating the document in */).doc().set(/* the body of the request */);)
        */
    }
    catch (error) {
        console.log(error.message);
        //res.status(400).send(error.message);
    }
};

const updateUser = async (req, res, next) => {
    try {
        // the id could be given in the link. For example: www.website.com/users/thisIsTheID
        // You would access this id using req.params.id
        
        const user = await firebase.collection(/* the collection that the documents in */).doc(/* the id */);
        await user.update(/* the data */);
        res.send('User record updated successfully');
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addUser
}
