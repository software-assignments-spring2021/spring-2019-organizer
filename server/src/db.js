// db.js
const mongoose = require('mongoose') 
const URLSlugs = require('mongoose-url-slugs');
// my schema goes here!

// schema for people
const PeopleSchema = new mongoose.Schema({
    name: {type: String, default:false},
    class:[ClassSchema],
    text: String
});
// schema for class
const ClassSchema = new mongoose.Schema({
    title: String,
    quiz: [QuizSchema],
    assignment:[AssignmentSchema],
    text:{type: String, default:false}
});
// schema for assignment
const AssignmentSchema = new mongoose.Schema({
    title: String,
    duetime: String,
    opentime: String,
    text:{type: String, default:false}
});
// schema for quiz
const QuizSchema = new mongoose.Schema({
    title: String,
    duetime: String,
    limitime: String,
    text:{type: String, default:false}
});
//BookSchema.plugin(URLSlugs('name title'));
mongoose.model("Class", ClassSchema)
mongoose.model("Assignment", AssignmentSchema)
mongoose.model("Quiz", QuizSchema)
mongoose.model("People", PeopleSchema)
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/organizer',{ useNewUrlParser: true });