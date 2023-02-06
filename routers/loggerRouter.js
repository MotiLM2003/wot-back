const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();

const {
    addLog,getLogs,deleteLogs
} = require("../controllers/loggerController");


// router.post("/addTransaction", addTransaction);
router.post("/add", addLog);
router.post("/get", getLogs);
router.delete('/delete', deleteLogs)

module.exports = router;
