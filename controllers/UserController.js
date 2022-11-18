'use strict';

const firebase = require('../db');
const User = require('../models/User');
const firestore = firebase.firestore();


const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('users').doc().set(data);
        //res.send('Record saved successfully');
    }
    catch (error) {
        console.log(error.message);
        //res.status(400).send(error.message);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await firestore.collection('users');
        const data = await users.get();
        const usersArray = [];
        if (data.empty) {
            res.status(404).send('No user record found');
            return;
        }
        data.forEach(doc => {
            const user = new User(
                doc.id,
                doc.data().username,
                doc.data().email,
                doc.data().password
            );
            usersArray.push(user);
        });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firebase.collection('users').doc(id);
        const data = await user.get();
        if (!data.exists) {
            res.status(404).send('User with the given ID not found');
            return;
        }
        res.send(data.data());
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await firebase.collection('users').doc(id);
        await user.update(data);
        res.send('User record updated successfully');
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firebase.collection('users').doc(id).delete();
        res.send('Record deleted successfully');
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}