//mongoDB
require('./db');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Class = mongoose.model('Class');
const Task = mongoose.model('Task');
const Tag = mongoose.model('Tag');

// OAuthentication
const passport = require('passport');
const express = require('express');
const auth = require('./oauth');
const cookieSession = require('cookie-session');

//set up middleware
const app = express();

// create a new cookie session middleware
app.use(cookieSession({
    name: 'session',
    keys: ['secert']
}));

// initialize the passport
app.use(passport.initialize());

// configure strategy
auth(passport);

// authenticate request
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}));

// runs the functions in strategy
app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        req.session.token = req.user.token;
        console.log(req.user.email);
        res.redirect('/');
    }
);

// homepage
app.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
    } else {
        res.cookie('token', '');
        res.json({
            status: 'session cookie not set'
        });
    }
});

// login router
app.get('/login', (req, res) => {
    res.redirect('/auth/google');
});

// logout router
app.get('/logout', (req, res) => {
    // invoking passport logout method to remove req.user
    req.logout();
    req.session = null;
    res.redirect('/');
});



app.post('/class/add', function (req, res) {
    const subject = req.class;
    const newClass = new Class({

    });

    newClass.save(function(saveErr, saveClass, saveCount) {
        if (saveErr) {
            res.send(new Error(saveErr));
        } else {
            res.redirect('/');
        }
    });
});

app.post('/task/add', function (req, res) {
    const task = req.task;

    const newTask = new Task({

    });

    newTask.save(function(saveErr, saveAsn, saveCount) {
        if (saveErr) {
            res.send(new Error(saveErr));
        } else {
            res.redirect('/');
        }
    });
});

app.post('/tag/add', function (req, res) {
    const tag = req.tag;
    
    const newTag = new Tag({
     
    });

    newTag.save(function(saveErr, saveTag, saveCount) {
        if (saveErr) {
            res.send(new Error(saveErr));
        } else {
            res.redirect('/');
        }
    });
});

app.post('/subtask/add', function (req, res) {
    const subtask = req.subtask;
    
    const newTag = new Tag({
     
    });

    newTag.save(function(saveErr, saveSubTask, saveCount) {
        if (saveErr) {
            res.send(new Error(saveErr));
        } else {
            res.redirect('/');
        }
    });
});





app.get('/user')


//run the server
app.listen(3000, 'localhost');
