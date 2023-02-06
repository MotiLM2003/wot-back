const mongoose = require("mongoose");

const loggerSchema = new mongoose.Schema(
  {
      loggerId:  { type: Number, required: true },
      statusCode : { type: Number, required: true },
      descriptionId : { type : Number, required: true},
       params  : { type: Array, required:false, default:[]} 
  },

  {
    timestamps: true,
  }
);

const LoggerSchema = mongoose.model(
  "Logs",
  loggerSchema
);
module.exports = LoggerSchema;
