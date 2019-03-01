const mongoose = require('mongoose');

//schema for user
const user = new mongoose.Schema({
    username: {type: String, required: true},

    //for now, assume we had figured out the
    //use of passport.js. In future, this might
    //change.
    password: {type: String, required: true},
});

//Schema for homework/event
const homework = new mongoose.Schema({
    userId: String, // the user id in the database the
        //assignment is bounded to
    status: Number, // is the hw is in process? is it done??
    estWload: Number, // the estimated workload
    estTime: Number, // time estimated for doing the hw
    actTime: Number, // time spent in practice to get the hw done
    subject: String, //subject the assignment belongs to
    hwname: String, // name of the homework
    hwtype: String, // type of the homework programming assignemnt? quiz?
    desc: String, //description of the assignment
    ddl: String, //deadline
    tags: Array, // an array of tags
    res: String // list of homework resource hyperlinks
});

//Schema for records
const record = new mongoose.Schema({
    userId: String, // corresponding user id in db
    subject: String, // corresponding subject
    hwtype: String, // corresponding type
    timeRec: Array, // an array of time spent on the each of hw
});

//register Schemas
mongoose.model('User', user);
mongoose.model('Homework', homework);
mongoose.model('Record', record);
