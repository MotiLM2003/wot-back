const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    isDescription: { type: Boolean, default: true, required: true },
    isEndDate: { type: Boolean, default: true, required: true },
    isDonorList: { type: Boolean, default: true, required: true },
    isGoal: { type: Boolean, default: true },
    isPresrDontaion: {
      type: Boolean,
      default: true,
      required: true,
    },
    isImgVideoSlider: {
      type: Boolean,
      default: true,
      required: true,
    },
    isCertificate: {
      type: Boolean,
      default: true,
      required: true,
    },
    charityButtons: {
      type: Array,
      default: [],
    },
    bannerItems: {
      type: Array,
      default: [],
    },

    isMainBanner: { type: Boolean, default: true, required: true },
    status: { type: Number, default: 0, required: true },
    campaignName: { type: String, default: "", trim: true, required: true },
    shortDescription: { type: String, default: "" },
    campaignContent: { type: String, default: "" },
    goal: { type: Number, default: 0, required: true },
    bonusGoal: { type: Number, default: 0 },
    endDate: { type: Date, trim: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Camping = mongoose.model("Campaigns", campaignSchema);
module.exports = Camping;
