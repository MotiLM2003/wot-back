const { handleAction } = require("./benquestPlatform");

const handlePaymentAction = (recurring, options) => {
  const { paymentType } = recurring;

  switch (paymentType) {
    case 0: {
      return handleAction(recurring, options);
    }
  }
};


module.exports = { handlePaymentAction };
