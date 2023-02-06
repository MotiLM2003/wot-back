const Recurring = require("../models/Rrecurrings");
const addNewRecurring = async (data) => {

  const recurring = new Recurring(data);
  try {
    const newRecurring = await recurring.save();
    return newRecurring;
  } catch (err) {
    console.log("err", err);
  }
};

const getAll = async (filters = {}) => {
  const donations = await Recurring.find(filters).populate({
    path: "campaign",
    model: "Campaigns",
    select: { _id: 1, campaignName: 1 },
  }).populate("currency").populate('paymentInterface');
  return donations;
};

const updateById = async (filters = {}) => {
  try {
    const { _id } = filters;

    delete filters._id;
    const recurring = await Recurring.updateOne({ _id }, filters);
    return recurring;
  } catch (err) {
    console.log("err", err);
    return null;
  }
};

const increaseRecurringCount = async (filters = {}) => {
  try {
    const { _id } = filters;

    delete filters._id;
    const recurring = await Recurring.findOneAndUpdate(
      { _id, _id },
      { $inc: { currentRecurringCount: 1 } }
    );
    return recurring;
  } catch (err) {
    console.log("err", err);
    return null;
  }
};

const DBGetRecurringById = async (_id) => {

  try {
    const recurring = await Recurring.findOne({
      _id,
    }).populate("currency").populate('campaign').populate('paymentInterface');
    return recurring;
  } catch (err) {
    return { error: err };
  }
};

const getDBRecurringCount = async (filters = {}) => {
  const count =   await Recurring.count(filters);

  return   {count}

}

const DBGetRecurringTaskList = async (filters) => {
  try {
    const recurring = await Recurring.find({ 
      $or : [{recurringCount : 0 }, {  $expr :  {$lt: ['$currentRecurringCount','$recurringCount']}}],
      $and : [{ isActive : true}]
    }).populate({
      path: 'paymentInterface',
      match: { id: 0 },
    });
    return recurring;
  } catch (err) {
    console.log(err)
    return { error: err };
  }
};



module.exports = {
  addNewRecurring,
  getAll,
  updateById,
  increaseRecurringCount,
  DBGetRecurringById,
  DBGetRecurringTaskList,
  getDBRecurringCount
};
