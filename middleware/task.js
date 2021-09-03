const Task = require("../models/task");

module.exports = {
  retrieveTasks: async (req, res, next) => {
    let username = req.user.username;
    const tasks = await Task.find({ username: username });
    req.tasks = tasks;

    next();
  },
  createTask: async (req, res, next) => {
    const username = req.user.username;
    const task = req.body;
    console.log("task: " + task);
    const newTask = await Task.create({
      username: username,
      title: task.title,
      startDate: task.startDate,
      endDate: task.endDate,
    });
    req.task = newTask;
    next();
  },
  updateTask: async (req, res, next) => {
    const task = req.body;
    console.log("task: " + JSON.stringify(task));
    const newTask = await Task.updateOne(
       
      {
        _id:task.id
      },
      {
        title: task.title,
        startDate: task.startDate,
        endDate: task.endDate,
      }
    );
    req.task =await Task.find({ _id:task.id });
    ;
    next();
  },
  deleteTask: async(req,res,next) => {
    const index = req.body._id;
    console.log('index:' + index)
    const result = await Task.deleteOne({
      _id:index
    });
    console.log('delete: ' + JSON.stringify(result))
    req.task = result;
    next()
  }
};
