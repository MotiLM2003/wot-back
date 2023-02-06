const {
  dbAddCurrency,
  getAll,
  updateById,
} = require("../actions/currencyDBActions");

const addCurrency = async (req, res) => {
  const currency = await dbAddCurrency(req.body);

  res.status(201).send(currency);
};

const getCurrencies = async (req, res) => {
  try {
    const lst = await getAll(req.body);

    res.send(lst);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateCurrencyById = async (req, res) => {
  try {
    const response = await updateById(req.body);
    res.status(201).send(response);
  } catch (err) {
    console.log("err", err);
    res.send(err);
  }
};

module.exports = {
  addCurrency,
  getCurrencies,
  updateCurrencyById,
};
