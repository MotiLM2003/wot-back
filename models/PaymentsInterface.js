const mongoose = require("mongoose");

const paymentsInterfaceSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    processor : {type : Number, required: true, default: 1},
    isActive: { type: Boolean, required: true, default: true },
    paymentName: { type: String, required: true },
    feePercentage: { type: Number, required: true },
    fixedFee: { type: Number, required: true },
    daysToRelease: { type: Number, required: true, default: 7 },
    interfaceResponses: { type: Array, required: false, default: [] },
    allowedCurrencies: { type: Array, required: false, default: [] },
  },

  {
    timestamps: true,
  }
);

const PaymentsInterfaceSchema = mongoose.model(
  "PaymentsInterface",
  paymentsInterfaceSchema
);
module.exports = PaymentsInterfaceSchema;
