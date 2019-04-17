// db.js
const mongoose = require('mongoose');
// my schema goes here!

// Tag with the same name will have the same color
// Tag are things like quiz, assignments or other tags users want to create 
const TagSchema = new mongoose.Schema({
    name: String,
    color: String,
});


// schema for assignment
const TaskSchema = new mongoose.Schema({
    name: String,
    duetime: String, //yyyy-mm-ddThh:mm
    opentime: String,
    finishtime: String,
    tag: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TagSchema' }],
    state: String,
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassSchema' }, 
    description: {type: String, default:false},
    difficulty: Number,
    estimated: Number,
    subTask: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubTaskSchema' }],
    actualtime: Number
});

const SubTaskSchema = new mongoose.Schema({
    name: String,
    finishtime: String,
    state: String,
    estimated: {type: String, default:false},
    actualtime: Number,
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'TaskSchema' }
});

// schema for class
const ClassSchema = new mongoose.Schema({
    name: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' }, 
    task: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskSchema' }],
    deviation: Number
});

// schema for people
const UserSchema = new mongoose.Schema({
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

mongoose.model("Class", ClassSchema);
mongoose.model("Task", TaskSchema);
mongoose.model("User", UserSchema);
mongoose.model("Tag", TagSchema);
mongoose.model("SubTask", SubTaskSchema);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/organizer',{ useNewUrlParser: true });
