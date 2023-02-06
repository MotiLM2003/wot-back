const moment = require("moment");
const { charge } = require("../../actions/banquestDBActions");

const handleAction = async (recurring, options) => {
  const { sum, creditCardExpire, CVC, creditCardNumber } = recurring;

  const { action } = options;
  const cardDetails = {
    amount: sum,
    expiry_month: creditCardExpire.slice(0, 2),
    expiry_year: `20${creditCardExpire.slice(2, 4)}`,
    cvv2: CVC,
    card: creditCardNumber,
  };

  switch (action) {
    case "charge": {
      console.log("charging credit card", cardDetails);
      try {
        const newCharger = await charge(cardDetails);
        console.log(newCharger.data);
        return newCharger;
      } catch (err) {
        return { err: err };
      }
    }
  }
};

module.exports = { handleAction };
