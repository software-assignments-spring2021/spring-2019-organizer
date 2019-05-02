// db.js
const mongoose = require('mongoose');
// my schema goes here!

// Tag with the same name will have the same color
// Tag are things like quiz, assignments or other tags users want to create 
const tagSchema = new mongoose.Schema({
    user: String,
    task: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskSchema' }],
    name: String,
    color: String,
});


// schema for assignment
const taskSchema = new mongoose.Schema({
    user: String,
    name: String,
    duetime: String,
    opentime: String,
    starttime: String,
    finishtime: String,
    tag: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TagSchema' }],
    state: Boolean,
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassSchema' }, 
    description: String,
    difficulty: Number,
    predictiontime: Number,
    actualtime: Number
});

// schema for class
const classSchema = new mongoose.Schema({
    name: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' }, 
    task: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskSchema' }],
    deviation: Number
});

// schema for people
const userSchema = new mongoose.Schema({
    name: String,
    netid: String,
    password: String,
    class: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClassSchema' }],
    task: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskSchema' }],
    tag: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TagSchema' }],
    tip: String,
    allDeviation: Number,
    workingTime: [Number],
});

mongoose.model("User", userSchema, 'User');
mongoose.model("Class", classSchema, 'Class');
mongoose.model("Task", taskSchema, 'Task');
mongoose.model("Tag", tagSchema, 'Tag');
mongoose.connect('mongodb://teambest:organizer100@ds149806.mlab.com:49806/organizer', { useNewUrlParser: true }, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("sucessfully connect to mlab");
    }
});
