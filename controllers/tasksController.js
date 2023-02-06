const {
    getAll,
    updateById
} = require("../actions/tasksDBActions");

const { setTaskActiveStatus , runTask : localRunTask} = require("../TasksEngine/taskEngine");

const getTasks = async (req, res) => {
  try {
    const lst = await getAll(req.body);
    res.send(lst);
  } catch (err) {
    res.s
    
    
};
}


const updateTask = async (req, res) => {
  try {
    const response = await updateById(req.body);
    res.status(201).send(response);
  } catch (err) {
    console.log("err", err);
    res.send(err);
  }
}


const setTaskStatus = async (req, res) => {
  try {
  await setTaskActiveStatus(req.body); 
  res.send({message:  true})
  } catch (err) { 
    res.status(500).send({message: err.message})
  }
}

const runTask = async (req, res) => {
  try {
  console.log('starting task');
 await localRunTask(req.body)
  res.send({ message : true})
} catch (err) { 
  res.status(500).send({message: err.message})
}
}

module.exports = {
    getTasks,
    updateTask,
    setTaskStatus,
    runTask
};
