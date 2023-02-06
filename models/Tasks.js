const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
      id :  { type: Number, required: true },
      intervalType :  { type: Number, required: true },
      intervalTicks :  { type: Number, required: true },
      description: { type: String, required: true} ,
      isActive : { type: Boolean, required: true, default: false},
      lastStartDate: { type: Date, },
      lastRunDate: { type: Date, }
      
  },

  {
    timestamps: true,
  }
);



const TaskSchema = mongoose.model(
  "Tasks",
  taskSchema
);
module.exports = TaskSchema;
