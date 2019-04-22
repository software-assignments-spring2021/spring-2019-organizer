//suupose we have people's free time for everyday in a week
//We have level of difficulties for each people
// we have prediction time of people for each task

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

console.log((standard_deviation_class(dic_realtime_class1,dic_predictime_class1)));
console.log((standard_deviation_class(dic_realtime_class2,dic_predictime_class2)));
console.log((standard_deviation_class(dic_realtime_class3,dic_predictime_class3)));
console.log(standard_deviation_user(final_list));

module.exports = {
    standard_deviation_class:standard_deviation_class,
    standard_deviation_user:standard_deviation_user
};
