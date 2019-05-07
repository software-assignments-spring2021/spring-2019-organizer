//suupose we have people's free time for everyday in a week
//We have level of difficulties for each people
// we have prediction time of people for each task

// Real analysis 

require('./db');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Class = mongoose.model('Class');
const Task = mongoose.model('Task');
const Tag = mongoose.model('Tag');
class SD_Calculater{
    constructor(user) {
        this.user = user;
        this.user_class_list = user.class;
        this.user_task_list = user.task;
        this.user_sd = user.allDeviation;
        this.class_sd_dic = {};
        this.potentialerror = [];
    } 

    // generate the original class sd for ths chosen class
    generate_class_sd(class_obj){
        let sd_class = 0;
        let n = 1;
        for (let key in class_obj.task){
            if(key.actualtime !== 0 && key.predictiontime !== 0){
            sd_class = (key.actualtime / key.predictiontime) + sd_class * (n - 1);
            sd_class = sd_class / n;
            n += 1;
            }
        }
        sd_class = Math.round(sd_class * 100) / 100;
        const newclass = new Class({
            name: class_obj.name,
            user: class_obj.user, 
            task: class_obj.task,
            deviation: sd_class
        });
        Class.findOneAndUpdate({ _id : class_obj._id },newclass, (err,curclass) => {
            // send back JSON (for example, updated objects... or simply a message saying that this succeeded)
            // ...if error, send back an error message ... optionally, set status to 500
            if(err){
                console.log("err in updating class sd")
            }else{
                User.findOneAndUpdate({ netid: class_obj.user }, { $push: { class: curclass._id } });
            }
        });
        this.class_sd_dic[class_obj] = sd_class;
    };

    
    // generate the original user sd based on the raw input
    generate_user_sd(){
        let sd_user = 0;
        let totalnum = 0;
        for (let class_cur in this.user.class){
            this.generate_class_sd(class_cur);
        }
        for (let key in this.user.class){
            if(key.actualtime !== 0 && key.predictiontime !==0){
             sd_user = key.deviation * key.task.length + sd_user * totalnum;
             totalnum = totalnum + key.task.length
             sd_user = sd_user / totalnum
            }
        }
        const newUser = new User({
            name: this.user.name,
            netid: this.user.netid,
            password: this.user.password,
            class: this.user.class,
            task: this.user.task,
            tag: this.user.tag,
            tip: this.user.tip,
            allDeviation: sd_user,
            workingTime: [],
        });
        User.findOneAndUpdate({ _id : this.user._id }, newUser, (err,curuser) => {
            // send back JSON (for example, updated objects... or simply a message saying that this succeeded)
            // ...if error, send back an error message ... optionally, set status to 500
            if(err){
                console.log("user sd update error")
            }else{
                console.log("success in user sd update")
            }
        });
        this.user_sd = sd_user;
    }; 

// if the prediction is too far away from actual
    detect_error(){
        for(let key in this.user_task_list){
            if(key.actualtime > key.predictiontime * 3){
                this.potentialerror.push(key)
            }
        }
    }
 
   generate_user_prediction(class_chosen,userpredict){
        if(class_chosen.task.length > 1){
            consolel.log("Our suggest finish time");
            let prediction = this.class_sd_dic[class_chosen] * userpredict;
            return prediction
        }else{
            console.log("class_chosen does not exist yet");
            console.log("We will use the user sd for you temporirally");
            let prediction = userpredict * this.user_sd;
            consolel.log("Our suggest finish time");
            console.log(prediction);
            return prediction
        }
    }

}

//For analysis
//sample 1
const dic_predictime_class1 = {
    "assignment1":5,
    "assignment2":5,
    "assignment3":8,
    "assignment4":9,
    "assignment5":10,
    "assignment6":3,
    "assignment7":7
}

const dic_realtime_class1 = {
    "assignment1":10,
    "assignment2":9,
    "assignment3":7,
    "assignment4":4,
    "assignment5":14,
    "assignment6":5,
    "assignment7":9
}

//sample2
const dic_realtime_class2 = {
    "assignment1":5,
    "assignment2":5,
    "assignment3":8,
    "assignment4":9,
    "assignment5":10,
    "assignment6":3,
    "assignment7":7
}

const dic_predictime_class2 = {
    "assignment1":5,
    "assignment2":5,
    "assignment3":8,
    "assignment4":9,
    "assignment5":10,
    "assignment6":3,
    "assignment7":7
}

// sample 3
const dic_realtime_class3 = {
    "assignment1":5,
    "assignment2":5,
    "assignment3":8,
    "assignment4":9,
    "assignment5":10,
    "assignment6":3,
    "assignment7":7,
    "assignment8":5,
    "assignment9":5,
    "assignment10":8,
}

const dic_predictime_class3 = {
    "assignment1":5,
    "assignment2":5,
    "assignment3":8,
    "assignment4":9,
    "assignment5":10,
    "assignment6":3,
    "assignment7":7,
    "assignment8":5,
    "assignment9":5,
    "assignment10":8,
}



// we calculate the sd for each class
// 
function standard_deviation_class(dic_realtime,dic_predict){
    let sd1 = 0;
    let n = 1;
    for (const key in dic_realtime){
        sd1 = (dic_realtime[key] / dic_predict[key]) + sd1 * (n - 1);
        sd1 = sd1 / n;
        n += 1;
    }
    sd1 = Math.round(sd1 * 100) / 100
    return [sd1,n];
}

// update stand_deviation_class
function update_standard_deviation_class(dic_class1,newtask_predict,newtask_realtime){
    let sd_cur = dic_class1.sd;
    let n = dic_class1.tasks.length;
    sd_cur = (newtask_realtime / newtask_predict) + sd1 * (n - 1);
    sd_cur = sd1 / n;
    sd_cur = Math.round(sd1 * 100) / 100;
    dic_class1.sd = sd_cur;
}



// a list of class for one user
function gather_class_sd(predictime_list,realtime_list){
    let final_list = [];
    for(var i =0;i<predictime_list.length;i++){
        let temp_list = standard_deviation_class(realtime_list[i],predictime_list[i])
        final_list.push(temp_list);
    }
    return final_list;
}

//we calculate the sd for each user
function standard_deviation_user(class_sd_list){
    let sdtotal = 0;
    let totalnum = 0;
    for (var i = 0;i<class_sd_list.length;i++){
         sdtotal = class_sd_list[i][0] * class_sd_list[i][1] + sdtotal * totalnum;
         totalnum = totalnum + class_sd_list[i][1]
         sdtotal = sdtotal / totalnum
    }
    return sdtotal;
}

// update stand_deviation_user
function update_standard_deviation_user(dic_user,newclass,newclasssd){
    let sd_user = dic_user.sd;
    let n_user = dic_user.tasks.length;
    let n_class = newclass.length;
    let sd_class = newclasssd;
    sd_new = sd_user * n_user + n_class * sd_class
    sd_new = sd_new / (n_user + n_class);
    sd_new = Math.round(sd_new * 100) / 100;
    dic_user.sd = sd_new;
}


predictime_list = [dic_predictime_class1,dic_predictime_class2,dic_predictime_class3];
realtime_list = [dic_realtime_class1,dic_realtime_class2,dic_predictime_class3];
final_list = gather_class_sd(predictime_list,realtime_list);

// console.log((standard_deviation_class(dic_realtime_class1,dic_predictime_class1)));
// console.log((standard_deviation_class(dic_realtime_class2,dic_predictime_class2)));
// console.log((standard_deviation_class(dic_realtime_class3,dic_predictime_class3)));
// console.log(standard_deviation_user(final_list));

// Creational design pattern: Prototype
// It is standard deviation calculator for prediction model
// We will have deviation for each class of the user and user as well.


test_user = {
    name: "test",
    netid: "abc",
    password: "llla",
    class: [],
    task: [],
    tag: [],
    tip: "Fighting!",
    allDeviation: 1.5,
    workingTime: [],
}

module.exports = {
    standard_deviation_class:standard_deviation_class,
    standard_deviation_user:standard_deviation_user
};

const testuser2 = {
    name: "test1",
    netid: "abc",
    password: "Iamatestuser",
    class: [testclass1,testclass2],
    task: [testtask1_1,testtask2_1,testtask1_2,testtask_2_2],
    allDeviation: 1,
    // workingTime: [Number],
};

const testclass1 = {
    name: "testclass1",
    user: testuser2, 
    task: [testtask1_1,testtask2_1],
    deviation: 1
};

const testclass2 = {
    name: "testclass2",
    user: testuser2, 
    task: [testtask1_2,testtask2_2],
    deviation: 1
};

const testtask1_1 = {
    name: "quiz1 for testclass1",
    duetime: "",
    opentime: "",
    starttime: "",
    finishtime: "",
    state: "",
    class: testclass1, 
    description:"",
    difficulty: 3,
    predictiontime: 10,
    actualtime: 12
};

const testtask2_1 = {
    name: "assignment1 for testclass1",
    duetime: "",
    opentime: "",
    starttime: "",
    finishtime: "",
    state: "",
    class: testclass1, 
    description:"",
    difficulty: 4,
    predictiontime: 5,
    actualtime: 7
};

const testtask1_2 = {
    name: "quiz1 for testclass2",
    duetime: "",
    opentime: "",
    starttime: "",
    finishtime: "",
    state: "",
    class: testclass2, 
    description:"",
    difficulty: 3,
    predictiontime: 10,
    actualtime: 12
};

const testtask2_2 = {
    name: "assignment1 for testclass2",
    duetime: "",
    opentime: "",
    starttime: "",
    finishtime: "",
    state: "",
    class: testclass2, 
    description:"",
    difficulty: 5,
    predictiontime: 3,
    actualtime: 9
};