const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();

const {
  addCurrency,
  getCurrencies,
  updateCurrencyById,
} = require("../controllers/currenciesController");
// router.post("/", getPaymentsInterface);
router.post("/get", getCurrencies);
router.post("/add", addCurrency);
router.put("/update", updateCurrencyById);

module.exports = router;
