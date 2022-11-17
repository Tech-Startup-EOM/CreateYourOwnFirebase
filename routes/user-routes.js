const express = require('express');
const {addUser} = require('../controllers/UserController');

const router = express.Router();

router.post('/user', addUser);

module.exports = {
    routes: router
}