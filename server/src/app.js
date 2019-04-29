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

// router for handling task CRUD
app.route('/task')
    // getting all tasks
    .get(function(req, res) {
        Task.find({}, function(err, tasks) {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.status(200).send(tasks);
            }
        });
    })
    // creating a task
    .post(function(req, res) {
        const task = req.task;
        const newTask = new Task({
            id: task.id, 
            name: task.name,
            duetime: task.duetime,
            opentime: task.opentime,
            starttime: task.starttime,
            finishtime: task.finishtime,
            tag: [],
            state: task.stage,
            class: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassSchema' }, 
            description: {type: String, default:false},
            difficulty: 0,
            predictiontime: 0,
            // subTask: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubTaskSchema' }],
            actualtime: 0
        });
    
        newTask.save(function(saveErr, saveAsn, saveCount) {
            if (saveErr) {
                res.send(saveErr);
            } else {
                res.status(200).send(saveAsn);
            }
        });        
    })
    // updating a single task
    .put(function(req, res) {
        const task = req.task;
        Task.findOneAndUpdate({id : task.id}, req.task, function(err, task) {
            if (err) {
                res.send(err);
            } else {
                res.status(200).send(task);
            }
        });
    })
    // delete a single task
    .delete(function(req, res) {
        const task = req.task;
        Task.findOneAndDelete({id : task.id}, req.task, function(err, task) {
            if (err) {
                res.send(err);
            } else {
                res.status(200).send(task);
            }
        });
    });    
    

// router for handling tag CRUD
app.route('/tag')
    // getting all tag
    .get(function(req, res) {
        Tag.find({}, function(err, tags) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(tags);
            }
        });
    })
    // adding a new tag
    .post(function(req, res) {
        const tag = req.tag;
        const newTag = new Tag({
            name: tag.name,
            color: tag.color
        });

        newTag.save(function(saveErr, saveTag, saveCount) {
            if (saveErr) {
                res.send(saveErr);
            } else {
                res.status(200).send(saveTag);
            }
        });
    })
    // deleting a tag
    .delete(function(req, res) {
        const tag = req.tag;
        Tag.findOneAndDelete({ name : tag.name }, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.status(200).send(result);
            }
        });
    });

// router for sending all tasks according to time format
app.get('/scheduling', (req, res) => {
    Task.find({}, (err, results, count) => {
        if (err) {
            res.redirect('/');
        } else {
            const iterator = (function() {
                let i = 0;
                const tasks = results;
                const length = tasks.length;

                return {
                    next: function() {
                        if (!this.hasNext()) {
                            return null;
                        }
                        let element = tasks[i];
                        i += 1;
                        return element;
                    },
                    hasNext: function() {
                        return i < length;
                    },
                    current: function() {
                        return tasks[i];
                    }
                };
            }());

            results.sort((a, b) => (a.opentime < b.opentime) ? 1 : -1);
            res.send(results);
        }
    }); 
});

//run the server
app.listen(3000, 'localhost');
