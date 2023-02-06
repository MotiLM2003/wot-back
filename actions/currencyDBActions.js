const Currency = require("../models/Currency");
const dbAddCurrency = async (data) => {
  const use = new Currency(data);
  try {
    const currency = await use.save();

    return currency;
  } catch (err) {
    console.log("err", err);
    return err;
  }
};

const getAll = async (filters = {}) => {
  try {
    const currencies = await Currency.find(filters);
    return currencies;
  } catch (err) {
    console.log(err);
  }
};

const updateById = async (filters = {}) => {
  try {
  
    const { _id } = filters;
    delete filters._id;

    const currency = await Currency.updateOne({ _id }, filters);

    return currency;
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = { dbAddCurrency, getAll, updateById };
