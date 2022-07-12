const Task = require("../models/task");

const taskIsValid = (newTask) => {
  let message = "";
  if (newTask.title.length < 1) {
    message = "The title can not be empty!";
    return false;
  }
  if (newTask.startDate > newTask.endDate) {
    message = "The Start Date must be early than End Date!";

    return false;
  }
  if (new Date(newTask.endDate) < Date.now()) {
    message = "The End Date must be later than today!";

    return { result: false, message: message };
  }
  return { result: true, message: message };
};

module.exports = {
  retrieveTasks: async (req, res, next) => {
    let username = req.user.username;
    req.tasks = await Task.find({ username: username });

    next();
  },
  createTask: async (req, res, next) => {
    const username = req.user.username;
    const task = req.body;
    validResult = taskIsValid(task);
    if (validResult.result) {
      const newTask = await Task.create({
        username: username,
        title: task.title,
        startDate: task.startDate,
        endDate: task.endDate,
      });
      if (newTask) {
        req.task = { ...newTask, state: true };
      } else {
        req.task = { state: false, message: "Creating new task failed!" };
      }
      next();
    } else {
      req.task = { state: false, message: validResult.message };
      next();
    }
  },
  updateTask: async (req, res, next) => {
    const task = req.body;
    validResult = taskIsValid(task);
    if (validResult.result) {
      const newTask = await Task.updateOne(
        {
          _id: task.id,
        },
        {
          title: task.title,
          startDate: task.startDate,
          endDate: task.endDate,
        }
      );
      if (newTask) {
        req.task = await Task.find({ _id: task.id });
        req.task = { ...req.task, state: true };
      } else {
        req.task = { state: false, message: "Updating new task failed!" };
      }
      next();
    } else {
      req.task = { state: false, message: validResult.message };
      next();
    }
  },
  deleteTask: async (req, res, next) => {
    const index = req.body._id;
    const result = await Task.deleteOne({
      _id: index,
    });
    if (result.deletedCount === 0) {
      req.task = { state: false, message: "Deleting task failed!" };
    } else {
      req.task = { state: true, message: "" };
    }
    next();
  },
};
