'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const userRoutes = require('./routes/user-routes');
const { login, register, addUser, getUser, updateUser, deleteUser } = require('./controllers/UserController');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.set('view-engine', 'html');
app.engine('html', require('ejs').renderFile)
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', userRoutes.routes);

app.get('/', function (req, res, next) {
    res.sendFile('C:/Users/khali/OneDrive/Documents/testFirebase/index.html');
    //res.sendFile('./index.html');
});
app.get('/register', function (req, res, next) {
    res.sendFile('C:/Users/khali/OneDrive/Documents/testFirebase/register.html');
});
app.get('/login', function (req, res, next) {
    res.sendFile('C:/Users/khali/OneDrive/Documents/testFirebase/login.html');
});

app.post('/UserRegister', function (req, res, next) {
    console.log(req.body);
    register(req, res, next);
    res.send('User created successfully');
});
app.post('/UserLogin', function (req, res, next) {
    console.log(req.body);
    login(req, res, next);
    res.send(`Logged in to ${req.body.email} successfully`);

    res.redirect('/');
});


app.get('/createUser', function (req, res, next) {
    res.sendFile('C:/Users/khali/OneDrive/Documents/testFirebase/createUser.html');
});
app.get('/updateUser', function (req, res, next) {
    res.sendFile('C:/Users/khali/OneDrive/Documents/testFirebase/updateUser.html');
});
app.get('/deleteUser', function (req, res, next) {
    res.sendFile('C:/Users/khali/OneDrive/Documents/testFirebase/deleteUser.html');
});
app.get('/getUser', function (req, res, next) {
    res.sendFile('C:/Users/khali/OneDrive/Documents/testFirebase/getUser.html');
});

app.post('/createUser', function (req, res, next) {
    console.log(req.body);
    addUser(req, res, next);
    res.send(`Created a user with email ${req.body.email} successfully`);
});
app.post('/getUser', async (req, res, next) => {
    const result = await getUser(req, res, next);
    //res.send(`Logged in to ${req.body.email} successfully`);
    if (result[0]) {
        res.render('C:/Users/khali/OneDrive/Documents/testFirebase/profile.html', result[1]);
    }
    else {
        res.send(result[1]);
    }
});
app.post('/updateUser', async (req, res, next) => {
    console.log(req.body);
    const result = await updateUser(req, res, next);
    if (result[0]) {
        res.redirect('/');
    }
    else {
        res.send(result[1]);
    }
});
app.post('/deleteUser', async (req, res, next) => {
    const result = await deleteUser(req, res, next);
    if (result[0]) {
        res.redirect('/');
    }
    else {
        res.send(result[1]);
    }
});

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));