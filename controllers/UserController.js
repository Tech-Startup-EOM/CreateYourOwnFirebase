'use strict';

const firebase = require('../db');
const User = require('../models/User');
const firestore = firebase.firestore();


const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('user').doc().set(data);
        res.send('Record saved successfully');
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUser
}