'use strict';

const { openDelimiter } = require('ejs');
const firebase = require('../db');
const User = require('../models/User');
const firestore = firebase.firestore();



const register = async (req, res, next) => {
    try {
        await firebase.auth().createUser({
            email: req.body.email,
            password: req.body.password,
            emailVerified: false,
            disabled: false,
            displayName: req.body.username
        });
    }
    catch (error) {
        console.log(error.message);
        //res.status(400).send(error.message);
    }
};
const login = async (req, res, next) => {
    try {
        /*await firebase.auth().signInWithEmailAndPassword({
            email: req.body.email,
            password: req.body.password
        });
        console.log('yess');*/
        const test = await firebase.auth().getUserByEmail(req.body.email);
            /*.then((user) => {
                currentUser = user.toJSON();
            }).catch(err => {
                console.log('Email or password invalid!');
            });*/
        console.log(test);
    }
    catch (error) {
        console.log(error.message);
        //res.status(400).send(error.message);
    }
};

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
            //res.status(404).send('No user record found');
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
        //res.status(400).send(error.message);
    }
};

const getUser = async (req, res, next) => {
    try {
        const data = req.body;
        var output = [false, 'Email not found!'];
        const user = await firestore.collection('users').where("email", "==", data.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().password == data.password) {
                        output = [true, doc.data()];
                    }
                    else {
                        output = [false, 'Incorrect Password'];
                    }
                });
            });
        return(output);
    }
    catch (error) {
        //res.status(400).send(error.message);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data);
        var output = [false, 'Email not found!'];
        const user = await firestore.collection('users').where("email", "==", data.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().password == data.oldPassword) {
                        doc.ref.update(
                            {
                                'email': data.email,
                                'password': data.newPassword,
                                'username': data.newUsername
                            }
                        );
                        output = [true];
                    }
                    else {
                        output = [false, 'Incorrect Password'];
                    }
                });
            });
        
        return(output);
    }
    catch (error) {
        console.log(error);
        return([false, 'it don\'t work dude. Error: ', error]);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const data = req.body;
        var output = [false, 'Email not found!'];
        const user = await firestore.collection('users').where("email", "==", data.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().password == data.password) {
                        doc.ref.delete();
                        output = [true];
                    }
                    else {
                        output = [false, 'Incorrect Password'];
                    }
                });
            });
        return(output);
    }
    catch (error) {
        //res.status(400).send(error.message);
    }
}

module.exports = {
    register,
    login,
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}