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
const bodyParser = require('body-parser');
const auth = require('./oauth');
const cookieSession = require('cookie-session');

//set up middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
        Task.find({}, function(err, results) {
            if (err) {
                return res.status(500).send(err);
            } else {
                // Loading tag object into Task tag attribute
                const dataRefiner = new Promise(function(resolve) {
                    const dataArray = [];
                    const promises = [];

                    // Looping through all tasks
                    for (const task of results) {
                        const tagsID = task.tag;
                        const data = task.toObject();

                        // Fetching all tags
                        const newP = Tag.find({}).exec();
                        newP.then(function(tags) {
                            const ids = tagsID.map((t) => { 
                                return t.toString(); 
                            });
                            const resp = tags.filter((t) => { 
                                return ids.includes(t._id.toString());
                            });

                            data.tag = resp;
                            dataArray.push(data);
                            
                        }, function(err) {
                            console.log(err);
                        });
                        promises.push(newP);
                    }
                    Promise.all(promises).then(() => {
                        resolve(dataArray);
                    });
                });

                dataRefiner.then((d) => {
                    res.status(200).send(d);
                });
            }
        });
    })
    // creating a task
    .post(function(req, res) {
        const task = req.body;
        const newTask = new Task({
            user: task.user,
            name: task.name,
            duetime: task.duetime,
            opentime: task.opentime,
            starttime: task.starttime,
            finishtime: task.finishtime,
            tag: task.tag,
            state: task.stage,
            class: task.class, 
            description: task.description,
            difficulty: 0,
            predictiontime: 0,
            actualtime: 0
        });
    
        newTask.save(function(err, task) {
            if (err) {
                res.send(err);
            } else {
                // Updating User, Class and Tag task list
                User.updateOne({ netid: task.user }, { $push: { task: task._id } })
                .then(() => {
                    return Class.updateOne({ _id: task.class }, { $push: { task: task._id } });
                }).then(() => {
                    task.tag.forEach((t) => {
                        Tag.updateOne({ _id: t }, { $push: { task: task._id } });
                    });
                }).then(() => {
                    res.status(200).send(task);
                });
            }
        });        
    })
    // updating a single task
    .put(function(req, res) {
        const task = req.query;
        Task.findOneAndUpdate({ _id : task._id }, task, function(err, task) {
            if (err) {
                res.send(err);
            } else {
                res.status(200).send(task);
            }
        });
    })
    // delete a single task
    .delete(function(req, res) {
        const task = req.query;
        Task.findOneAndDelete({ _id : task.id }, function(err, task) {
            if (err) {
                res.send(err);
            } else {
                // Updating User and Class task list
                User.updateOne({ netid: task.user }, { $pull: { task: task._id } })
                .then(() => {
                    return Class.updateOne({ _id: task.class }, { $pull: { task: task._id } });
                }).then(() => {
                    res.status(200).send(task);
                });
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
        const tag = req.body;
        const newTag = new Tag({
            user: tag.user,
            name: tag.name,
            color: tag.color
        });

        newTag.save(function(err, tag) {
            if (err) {
                res.send(err);
            } else {
                User.updateOne({ netid: tag.user }, { $push: { tag: tag._id } }, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).send(tag);
                    }
                });
            }
        });
    })
    // deleting a tag
    .delete(function(req, res) {
        const tag = req.query;
        Tag.findOneAndDelete({ name : tag.name }, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                // Updating User and Class task list
                User.updateOne({ netid: result.user }, { $pull: { tag: result._id } })
                .then(() => {
                    tag.task.forEac((id) => {
                        Task.updateMany({ _id: id }, { $pull: { tag: result._id } });
                    });
                }).then(() => {
                    res.status(200).send(result);
                });
            }
        });
    });

// router for sending all tasks according to time format
app.get('/schedule', (req, res) => {
    Task.find({}, (err, results) => {
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
                        i += 1;
                        return tasks[i-1];
                    },
                    hasNext: function() {
                        return i < length;
                    },
                    current: function() {
                        return tasks[i];
                    }
                };
            }());

            // Loading tag object into Task tag attribute
            const dataRefiner = new Promise(function(resolve) {
                const dataArray = [];
                const promises = [];

                // Looping through all tasks
                for (const task of results) {
                    const tagsID = task.tag;
                    const data = task.toObject();

                    // Fetching all tags
                    const newP = Tag.find({}).exec();
                    newP.then(function(tags) {
                        const ids = tagsID.map((t) => { 
                            return t.toString(); 
                        });
                        const resp = tags.filter((t) => { 
                            return ids.includes(t._id.toString());
                        });

                        data.tag = resp;
                        dataArray.push(data);
                        
                    }, function(err) {
                        console.log(err);
                    });
                    promises.push(newP);
                }
                
                // Sending the data after all have finished
                Promise.all(promises).then(() => { 
                    resolve(dataArray); 
                });
            });

            dataRefiner.then((d) => {
                // Sort the tasks according to opentime
                d.sort((a, b) => {
                    return new Date(a.opentime) < new Date(b.opentime);
                });
                res.status(200).send(d);
            });
        }
    }); 
});

// Michael's part

app.route("/user")
    // getting all user
    .get(function(req, res) {
        User.find({}, function(err, users) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(users);
            }
        });
    })
    
    
    .post(function (req, res) {
    const user = req.body;
    const newUser = new User({
        name: user.name,
        netid: user.netid,
        password: user.password,
        class: user.class,
        task: user.task,
        tag: user.tag,
        tip: user.tip,
        allDeviation: user.allDeviation,
        workingTime: user.workingTime,
    });
    newUser.save(function(saveErr, users) {
        if (saveErr) {
            res.send(error);
        } else {
            res.status(200).send(users);
        }
    });
})

// for user to edit
    .put(function (req, res) {
    // query is a user object
    const user = req.query;
    User.findByIdAndUpdate({ _id : task._id },user, (err,curuser) => {
        // send back JSON (for example, updated objects... or simply a message saying that this succeeded)
        // ...if error, send back an error message ... optionally, set status to 500
        if(err){
           res.send(err);
        }else{
            res.status(200).send(curuser);
        }
    });
})

    .delete(function (req, res) {
    const user = req.query;
    User.findOneAndDelete({_id:user._id }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// for class route handler
app.route("/class")
    // getting all classes
    .get(function(req, res) {
        Class.find({}, function(err, classes) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(classes);
            }
        });
    })
    // adding new class
    .post(function (req, res) {
        const class_new = req.body;
        const newclass = new Class({
            name: class_new.name,
            user: class_new.user, 
            task: class_new.task,
            deviation: class_new.deviation
        });

        newclass.save(function(saveErr, class_new) {
            if (saveErr) {
                res.send(error);
            } else {
                // Updating User list
                User.updateOne({ netid: class_new.user }, { $push: { class: class_new._id } });
                res.status(200).send(class_new);
            }
        });
    })
    
// for user to edit
    .put(function (req, res) {
    // query is a user object
    const class_new = req.query;
    Class.findByIdAndUpdate({ _id : class_new._id },class_new, (err,curclass) => {
        // send back JSON (for example, updated objects... or simply a message saying that this succeeded)
        // ...if error, send back an error message ... optionally, set status to 500
        if(err){
           res.send(err);
        }else{
            User.updateOne({ netid: class_new.user }, { $push: { class: curclass._id } });
            res.status(200).send(curclass);
        }
    });
})

    .delete(function (req, res) {
    const class_new = req.query;
    Class.findOneAndDelete({_id:class_new._id }, function(err, class_new) {
        if (err) {
            res.send(err);
        } else {
            User.updateOne({ netid: class_new.user }, { $push: { class: class_new._id } });
            res.status(200).send(class_new);
        }
    });
});

// run the server
app.listen(3000, 'localhost');
console.log("app running on port: ", 3000);
