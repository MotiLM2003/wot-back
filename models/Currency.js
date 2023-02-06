const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema(
  {
    isActive: { type: Boolean, default: true, required: true },
    abbr: { type: "string", default: "", required: true, trim: true },
    symbol: { type: "string", default: "", required: true, trim: true },
    description: { type: "string", default: "", trim: true },
  },
  {
    timestamps: true,
  }
);

const Currency = mongoose.model("Currencies", currencySchema);
module.exports = Currency;
