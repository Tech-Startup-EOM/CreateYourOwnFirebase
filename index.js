'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const userRoutes = require('./routes/user-routes');
const { addUser } = require('./controllers/UserController');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', userRoutes.routes);

app.get('/', function (req, res, next) {
    res.sendFile('C:/Users/khali/OneDrive/Documents/testFirebase/index.html');
});
app.post('/', function (req, res, next) {
    console.log(req.body);
    addUser(req, res, next);
    res.send('User created successfully');
});

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));