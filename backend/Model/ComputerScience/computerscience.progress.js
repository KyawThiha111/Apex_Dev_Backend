// models/ComputerScienceProgress.ts
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ComputerScienceProgressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // reference to User schema
      required: true,
    },
    progress: {
      Javascript: {
        type: [Number],
        default: [],
      },
      "Frontend development": {
        type: [Number],
        default: [],
      },
      "Introduction to Backend Development with Nodejs and Express": {
        type: [Number],
        default: [],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ComputerScienceProgress",
  ComputerScienceProgressSchema
);
