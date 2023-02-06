const { chargeCreditcard } = require("../actions/banquestDBActions");

const addCreditcardCharge = async (req, res) => {
  try {
    const results = await chargeCreditcard(req.body);
    if (results.data) {
      res.status(201).send(results.data);
    } else {
      res.status(401).send(results);
    }
  } catch (err) {
    // console.log("err", err);
    res.status(401).send(err);
  }
};





module.exports = {
  addCreditcardCharge,
};
