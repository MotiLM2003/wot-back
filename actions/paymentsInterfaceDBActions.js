const PaymentsInterface = require("../models/PaymentsInterface");

const getAll = async (filters = {}) => {
  try {
    const paymentsInterface = await PaymentsInterface.find(filters);
    return paymentsInterface;
  } catch (err) {
    console.log(err);
  }
};

const updateById = async (filters = {}) => {
  try {
   
    const { _id } = filters;
    delete filters._id;
    const pInterface = await PaymentsInterface.updateOne({ _id }, filters);
    return pInterface;
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = { getAll, updateById };
