const mongoose = require('mongoose');

//schema for user
const User = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
});

//Schema for homework/event
const Task = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
        // the user id in the database the assignment is bounded to
    state: Number, // is the hw is in process? is it done??
    estimated: Number, // time estimated for doing the hw, used 
    start: String, // start time 
    end: String, // end time
    subject: String, //subject the assignment belongs to, used
    name: String, // name of the homework, used
    text: String, //description of the assignment, used
    date: String, //deadline, used
    type: Array // hw types, used
});

//Schema for records
const Record = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // corresponding user id in db
    subject: String, // corresponding subject
    tags: String, // corresponding tags
    timeRec: Array, // an array of time spent on the each of hw
});

//connect to mongodb
mongoose.model("User", User);
mongoose.model("Task", Task);
mongoose.model("Record", Record);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/organizer',{ useNewUrlParser: true });