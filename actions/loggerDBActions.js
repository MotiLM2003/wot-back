
const Logger = require("../models/Logger");
const addLogger = async (data) => {
  const camp = new Logger(data);
  try {
    const logger = await camp.save();
    return logger;
  } catch (err) {
    console.log("err", err);
  }
};


const getAll = async (filters = {}) => {
  try {
    const logger = await Logger.find(filters);
    return logger;
  } catch (err) {
    console.log(err);
  }
};


const deleteLogsByFilter = async (filters = {}) => {
  try {
    const logger = await Logger.deleteMany(filters);
    return logger;
  } catch (err) {
    console.log(err);
  }
};


module.exports = { addLogger ,getAll,deleteLogsByFilter};
