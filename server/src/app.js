//dependencies
require('/db');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const User = mongoose.model('User');
const Class = mongoose.model('Class');
const Task = mongoose.model('Task');
const Tag = mongoose.model('Tag');

//set up app
const app = express();
const publicPath = path.resolve(__dirname,
    'public');
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.post('/user', function (req, res) {
    const user = req.user;
    const name = user.name;
    const subject = user.subject;
    const text = user.text;

    const newUser = new User({
        title: title,
        class: subject,
        text: text
    });

    newUser.save(function(saveErr, saveUser, saveCount) {
        if (saveErr) {
            res.send(new Error(saveErr));
        } else {
            res.redirect('/');
        }
    });
});


app.post('/class', function (req, res) {
    const subject = req.class;
    const name = subject.title;
    
    const newClass = new Class({
        title: name,
        assignment: [],
        text: ''
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
    const t = req.task;
    const title = t.title;
    const due = t.due_time;
    const open = t.open_time;
    const text = t.text;

    const newTask = new Task({
        name: title,
        duetime: due,
        opentime: open,
        finishtime: '',
        tag: '',
        state: 'in progress',
        text: text
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
    const name = t.name;

    const newTag = new Tag({
        name: name,
    });

    newTag.save(function(saveErr, saveTag, saveCount) {
        if (saveErr) {
            res.send(new Error(saveErr));
        } else {
            res.redirect('/');
        }
    });
});


//run the server
app.listen(3000, 'localhost');
