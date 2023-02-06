const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();

const { addCreditcardCharge } = require("../controllers/banqQuestController");

router.post("/charge", addCreditcardCharge);
// router.post("/get/", getDonations);
// router.post("/", addRecurring);
// router.put("/update", updateRecurringById);
// router.post("/getOne", getCampingById);
// router.get('/', auth, getAllUsers);
// router.post('/logout', auth, logOut);
// router.post('/logoutAll', auth, logOutAll);
// router.post('/save-user/', auth, saveUser);
module.exports = router;
