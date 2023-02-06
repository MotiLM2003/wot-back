const {
  getAll,
  //   addNewPayments,
  updateById,
  //   DBgetCampingById,
} = require("../actions/paymentsInterfaceDBActions");

const getPaymentsInterface = async (req, res) => {
  try {
    const lst = await getAll(req.body);
    res.send(lst);
  } catch (err) {
    res.status(500).send(err);
  }
};

const UpdatePaymentsInterfaceById = async (req, res) => {
  try {
    const response = await updateById(req.body);
    res.status(201).send(response);
  } catch (err) {
    console.log("err", err);
    res.send(err);
  }
};
module.exports = {
  getPaymentsInterface,
  UpdatePaymentsInterfaceById,

  //   UpdateCampingById,
};
