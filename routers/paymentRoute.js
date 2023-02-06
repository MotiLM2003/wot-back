const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();

const {
  addPayment,
  getPayments,
  addTransaction,
  getTotalPayments
  //   UpdateCampingById,
  //   getCampingById,
} = require("../controllers/paymentsController");
const { getCampingById } = require("../controllers/campingController");
router.post("/", addPayment);
router.post("/get", getPayments);
router.post("/addTransaction", addTransaction);
router.post("/getTottalPayments", getTotalPayments);
// router.put("/update", UpdateCampingById);
// router.post("/getOne", getCampingById);
// router.get('/', auth, getAllUsers);
// router.post('/logout', auth, logOut);
// router.post('/logoutAll', auth, logOutAll);
// router.post('/save-user/', auth, saveUser);
module.exports = router;
