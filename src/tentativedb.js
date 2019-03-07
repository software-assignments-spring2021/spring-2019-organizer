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
    estTime: Number, // time estimated for doing the hw
    actTime: Number, // time spent in practice to get the hw done
    subject: String, //subject the assignment belongs to
    hwname: String, // name of the homework
    desc: String, //description of the assignment
    ddl: String, //deadline
    tags: Array, // an array of tags (including hw types)
    res: String // list of homework resource hyperlinks
});

//Schema for records
const record = new mongoose.Schema({
    userId: String, // corresponding user id in db
    subject: String, // corresponding subject
    tags: String, // corresponding tags
    timeRec: Array, // an array of time spent on the each of hw
});

//register Schemas
mongoose.model('User', user);
mongoose.model('Homework', homework);
mongoose.model('Record', record);

//connect to mongodb
let dbconf = 'mongodb://localhost/Organizer';

if(process.env.NODE_ENV === 'PRO') {
    //if in the Production mode 
    const fs = require('fs');
    const path = require('path');
    const fn = path.join(__dirname, 'config.json');
    const data = fs.readFileSync(fn);
    const conf = JSON.parse(data);
    dbconf = conf.dbconf;
}

mongoose.connect(dbconf, {useNewUrlParser: true});