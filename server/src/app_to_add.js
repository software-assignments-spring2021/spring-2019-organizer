
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
const User = mongoose.model('User');
const Class = mongoose.model('Class');




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

// for user route handler to add
app.post('/user/add', function (req, res) {
    const user = req.user;
    const netid = req.netid;
    const password = req.password;
    if(req.tip !== ""){
        const tip = req.tip;
    }else{
        const tip = "";
    }
    const newUser = new User({
        name: user,
        netid: netid,
        password: password,
        
    });
    newUser.save(function(saveErr, saveUser, saveCount) {
        if (saveErr) {
            res.send(new Error(saveErr));
        } else {
            res.redirect('/');
        }
    });
});

// for user to edit
app.post('/user/edit', function (req, res) {
    const username = req.user;
    // const netid = req.netid;
    // const password = req.password;
    User.findByIdAndUpdate(user.id, { "$push": {name: username} }, { "new": true }, (err, docs) => {
        // send back JSON (for example, updated objects... or simply a message saying that this succeeded)
        // ...if error, send back an error message ... optionally, set status to 500
        if(err){
           res.send(new Error(saveErr));
        }else{
           res.redirect('/');
        }
    });
});

// for user route handler to delete
// Questions.deleteMany({"_id":"5cba9d1d08ed2f20bcaebd1b"});
app.delete('/user/delete', function (req, res) {
    const user = req.user;
    const netid = req.netid;
    User.deleteOne({"_id":user.id});
    res.redirect('/');
});

// for class route handler
app.post('/class/add', function (req, res) {
    const name = req.name;
    const user = req.user;
    const newClass = new Class({
        name: name,
        user: user,
        deviation: 1
    });
    newClass.save(function(saveErr, saveUser, saveCount) {
        if (saveErr) {
            res.send(new Error(saveErr));
        } else {
            console.log("success");
        }
    });

    User.findByIdAndUpdate(user.id, { "$push": newClass }, { "new": true }, (err, docs) => {
        // send back JSON (for example, updated objects... or simply a message saying that this succeeded)
        // ...if error, send back an error message ... optionally, set status to 500
        if(err){
           res.send(new Error(saveErr));
        }else{
           res.redirect('/');
        }
    });
});

// for class route handler
app.post('/class/edit', function (req, res) {
    const tempclass = req.class;
    const user = req.user;
    newClass.save(function(saveErr, saveUser, saveCount) {
        if (saveErr) {
            res.send(new Error(saveErr));
        } else {
            console.log("success");
        }
    });
    Class.findByIdAndUpdate(tempclass.id, { "$push": {name:tempclass.name} }, { "new": true }, (err, docs) => {
        // send back JSON (for example, updated objects... or simply a message saying that this succeeded)
        // ...if error, send back an error message ... optionally, set status to 500
        if(err){
           res.send(new Error(saveErr));
        }else{
           res.redirect('/');
        }
    });
});

// for class route handler to delete
// Questions.deleteMany({"_id":"5cba9d1d08ed2f20bcaebd1b"});
app.delete('/class/delete', function (req, res) {
    const user = req.user;
    const tempclass = req.tempclass;
    Class.deleteOne({name:tempclass.name});
    res.redirect('/');
});