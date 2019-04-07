// db.js
const mongoose = require('mongoose') 
// my schema goes here!

const TagSchema = new mongoose.Schema({
    name: String
});

// schema for assignment
const TaskSchema = new mongoose.Schema({
    name: String,
    duetime: String,
    opentime: String,
    finishtime: String,
    tag: [TagSchema],
    state: String,
    text:{type: String, default:false}
});


// schema for class
const ClassSchema = new mongoose.Schema({
    title: String,
    // quiz: [QuizSchema],
    assignment:[TaskSchema],
    text:{type: String, default:false}
});
// schema for people
const UserSchema = new mongoose.Schema({
    name: {type: String, default:false},
    class:[ClassSchema],
    text: String
});


mongoose.model("Class", ClassSchema);
mongoose.model("Task", TaskSchema);
mongoose.model("User", UserSchema);
mongoose.model("Tag", TagSchema);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/organizer',{ useNewUrlParser: true });
