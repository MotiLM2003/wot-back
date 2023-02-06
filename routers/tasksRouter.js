const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();

const {
  getTasks,
  updateTask,
  setTaskStatus,
  runTask
} = require("../controllers/tasksController");


 router.put("/update", updateTask);
router.post("/get", getTasks);
router.post("/set-task-status", setTaskStatus);
router.post("/run-task", runTask);


module.exports = router;
