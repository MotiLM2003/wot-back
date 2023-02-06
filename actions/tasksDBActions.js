const Task = require("../models/Tasks");


const getAll = async (filters = {}) => {
  try {
    const tasks = await Task.find(filters);
    return tasks;
  } catch (err) {
    console.log(err);
  }
};


const updateById = async (filters = {}) => {
  try {
 
    const { _id } = filters;
    delete filters._id;
    const task = await Task.updateOne({ _id }, filters);
    return task;
  } catch (err) {
    console.log("err", err);
  }
};



module.exports = { getAll,updateById};