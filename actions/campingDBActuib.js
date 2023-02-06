const Camping = require("../models/Camping");
const getAll = async (filters = {}) => {
  const campings = await Camping.find(filters).populate("owner", {
    _id: 1,
    firstName: 1,
    lastName: 1,
  });
  return campings;
};

const addNewCamping = async (data) => {
  const camp = new Camping(data);
  try {
    const camping = await camp.save();
    return camping;
  } catch (err) {
    console.log("err", err);
  }
};

const DBgetCampingById = async (_id) => {
  try {
    const camp = await Camping.findOne({
      _id,
    }).populate('owner');
    return camp;
  } catch (err) {
    return { error: err };
  }
};

const updateById = async (filters = {}) => {
  try {
    const { _id } = filters;
    delete filters._id;
    const camping = await Camping.updateOne({ _id }, filters);

    return camping;
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = { getAll, addNewCamping, updateById, DBgetCampingById };
