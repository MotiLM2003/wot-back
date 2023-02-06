const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();

const {
  getPaymentsInterface,
  //   addTransaction,
  UpdatePaymentsInterfaceById,
} = require("../controllers/paymentsInterfaceController");
router.post("/", getPaymentsInterface);
// router.post("/get", getPayments);
// router.post("/addTransaction", addTransaction);
router.put("/update", UpdatePaymentsInterfaceById);

module.exports = router;
