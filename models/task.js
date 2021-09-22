const mongoose = require("mongoose");
const uri = require('../config')

mongoose.connect(uri())

const TaskSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    title:{
        type:String,
        required: true,
        maxLength:50
    },
    startDate:{
        type:Date,
        required: true
    },
    endDate:{
        type:Date,
        required: true
    }
},{ db : 'your_progress' })

const Task = mongoose.model('tasks',TaskSchema);

module.exports=Task;
