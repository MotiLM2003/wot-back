
var mongoose = require('mongoose');
const Payments = require("../models/Payments");

const getAll = async (filters = {}) => {
  try {
    const payments = await Payments.find(filters)
      .populate("campaign", {
        _id: 1,
        campaignName: 1,
      })
      .populate("recurring", {
        _id: 1,
        recurringCount: 1,
        currentRecurringCount: 1,
      }).populate("currency");;
    return payments;
  } catch (err) {
    console.log(err);
  }
};

const addNewPayments = async (data) => {
  const pa = new Payments(data);
  try {
    const payment = await pa.save();
    return payment;
  } catch (err) {
    console.log("err", err);
  }
};



const getDBTotalPayments = async (filters = {}) => {
  let id = {}
  if (filters.campaign) {
     id =    { 'campaign' : new mongoose.Types.ObjectId(filters.campaign) }
  }

 try {

   const payments = await Payments.aggregate([
    { $match: id },
      { $group:  {
         _id : null,
         count :  { $sum : '$sum'}
      }}
    ])
    

  return payments
  } catch (err) {
   console.log(err)
   return {  sum : 0}
  }
  
}
// const DBgetCampingById = async (_id) => {
//   try {
//     const customer = await Camping.findOne({
//       _id,
//     });
//     return customer;
//   } catch (err) {
//     return { error: err };
//   }
// };

// const updateById = async (filters = {}) => {
//   try {
//     const { _id } = filters;
//     delete filters._id;
//     const camping = await Camping.updateOne({ _id }, filters);

//     return camping;
//   } catch (err) {
//     console.log("err", err);
//   }
// };

module.exports = { addNewPayments, getAll ,getDBTotalPayments};
