const express = require("express");
const router = express.Router();
const task = require('../middleware/task')
const auth = require('../middleware/auth')


router.get('/task/get-tasks',auth.auth,task.retrieveTasks,(req,res)=>{
    
    res.status(200).json(req.tasks)
})

router.post('/task/new-task',auth.auth,task.createTask,(req,res)=>{
    res.status(200).json(req.task)
})

router.post('/task/update-task',auth.auth,task.updateTask,(req,res)=>{
    res.status(200).json(req.task)
})
router.delete('/task/delete-task',auth.auth,task.deleteTask,(req,res)=>{
    res.status(200).json(req.task)
})


module.exports = router