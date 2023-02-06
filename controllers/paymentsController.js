const {
  getAll,
  addNewPayments,
  updateById,
  getDBTotalPayments

} = require("../actions/paymentsDBActions");

const { DBGetRecurringById } = require("../actions/recurringDBActions");

const {
  handlePaymentAction,
} = require("../utils/PaymentsSources/controlPayments");

const { increaseRecurringCount } = require("../actions/recurringDBActions");

const addPayment = async (req, res) => {
  try {
    const newPayment = await addNewPayments(req.body);
    res.status(201).send(newPayment);
  } catch (err) {
    console.log("err", err);
    res.send(err);
  }
};

const UpdateCampingById = async (req, res) => {
  try {
    const response = await updateById(req.body);
    res.status(201).send(response);
  } catch (err) {
    console.log("err", err);
    res.send(err);
  }
};

const getPayments = async (req, res) => {
  try {
   
    const lst = await getAll(req.body);

    res.send(lst);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addTransaction = async (req, res) => {
  const { paymentType, recurring } = req.body;
  const newRecurring = await DBGetRecurringById(recurring);
  handlePaymentAction(newRecurring, { action: "charge" });

  return;
  // Getting user
  try {
    console.log(req.body);
  } catch (err) {
    console.log(err);
  }
  // charging
  // handlePaymentAction(user.paymentType, { option: 1 });

  // console.log(user);
  return;
  // adding recurring count
  const newPayment = await addNewPayments(req.body);
  increaseRecurringCount({ _id: newPayment.recurring });
  res.send(newPayment);
};


const getTotalPayments = async (req, res) => {
  try {

    const lst = await getDBTotalPayments(req.body);
  
    res.send(lst);
  } catch (err) {
    res.status(500).send(err);
  }
}


module.exports = {
  addPayment,
  getPayments,
  addTransaction,
  getTotalPayments
  //   UpdateCampingById,
};
