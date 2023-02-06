const mongoose = require("mongoose");

const recurringSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    isPrivateDonation: {
      type: Boolean,
      default: false,
      required: true,
    },
    displayName: { type: String, default: "", required: true },
    currency:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Currencies",
      required: true,
    },

    sum: { type: Number, default: 0, required: true },
    fee: { type: Number, default: 0, required: true },
    isRecurring: { type: Boolean, default: true },
    recurringType: {
      type: Number,
      default: 0,
      required: true,
    },
    recurringCount: {
      type: Number,
      default: 0,
      required: true,
    },
    currentRecurringCount: {
      type: Number,
      default: 0,
      required: true,
    },
    isRecurring: {
      type: String,
      default: "1",
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    isAddPublicNote: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    isUpdatedByAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    isCompleteFee: {
      type: Boolean,
      default: false,
      required: true,
    },
    publicNote: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      default: "",
      required: true,
    },
    lastName: {
      type: String,
      default: "",
      required: true,
    },
    paymentType: {
      type: Number,
      default: 0,
      required: true,
    },
    cellphone: {
      type: String,
      default: "",
      required: true,
    },
    email: {
      type: String,
      default: "",
      required: true,
    },
    donationNote: {
      type: String,
      default: "",
    },
    privateNote: {
      type: String,
      default: "",
    },
    paymentType: {
      type: Number,
      default: 0,
      required: true,
    },
    creditCardNumber: {
      type: String,
      default: "",
    },
    creditCardExpire: {
      type: String,
      default: "",
    },
    CVC: {
      type: String,
      default: "",
    },
    routing_number: {
      type: String,
      default: "",
    },
    account_number: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    sec_code: {
      type: String,
      default: "",
    },
    isAgreeToTerms: {
      type: Boolean,
      default: false,
      required: true,
    },
    isMarketingEmail: {
      type: Boolean,
      default: false,
      required: true,
    },

    isImmediatePayment: {
      type: Boolean,
      default: false,
      required: true,
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaigns",
      required: true,
    },

    paymentInterface: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentsInterface",
      required: true,
    },
    lastPaymentDate: {
      type: Date,
      required: true,
    }

    
  },

  {
    timestamps: true,
  }
);

const Recurring = mongoose.model("Recurrings", recurringSchema);
module.exports = Recurring;
