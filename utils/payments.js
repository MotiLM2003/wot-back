const uuid = require("uuid");

const getNewPayment = (r) => {
  //   creating new payment object. 
  if(!r.reference_id) {
    r.reference_id = 0;
  }

  console.log('reference_id', r.reference_id)

  const payment = {
    createdDate: Date.now(),
    isPrivateDonation: r.isPrivateDonation,
    currency: r.currency,
    sum: r.sum,
    status: 0,
    fee: r.fee,
    isRecurring: r.isRecurring,
    recurringCount: r.currentRecurringCount,
    isAnonymous: r.isAnonymous,
    isCompleteFee: r.isCompleteFee,
    paymentType: r.paymentType,
    paymentInterface : r.paymentInterface,
    campaign: r.campaign,
    recurring: r._id,
    isCompletedPayment: false,
    paymentResponseDetails: {},
    reference_id : r.reference_id,
  };

  return payment;
};

module.exports = { getNewPayment };
