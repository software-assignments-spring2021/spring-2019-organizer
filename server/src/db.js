// db.js
const mongoose = require('mongoose') 
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
    duetime: String,
    opentime: String,
    finishtime: String,
    tag: [TagSchema],
    state: String,
    description:{type: String, default:false},
    difficulty: Number,
    predictiontime: Number,
    subTask:[SubTaskSchema],
    actualtime: Number
});

const SubTaskSchema = new mongoose.Schema({
    name: String,
    finishtime: String,
    state: String,
    description:{type: String, default:false},
    actualtime: Number
});

// schema for class
const ClassSchema = new mongoose.Schema({
    name: String,
    task:[TaskSchema],
    deviation: Number
});

// schema for people
const UserSchema = new mongoose.Schema({
    name: String,
    netid: String,
    password: String,
    class:[ClassSchema],
    tip: String,
    allDeviation: Number,
    workingTime: [Number],
});





mongoose.model("Class", ClassSchema);
mongoose.model("Task", TaskSchema);
mongoose.model("User", UserSchema);
mongoose.model("Tag", TagSchema);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/organizer',{ useNewUrlParser: true });
