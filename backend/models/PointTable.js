const mongoose = require("mongoose");

const pointTableSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },

    played: {
      type: Number,
      default: 0,
    },

    won: {
      type: Number,
      default: 0,
    },

    lost: {
      type: Number,
      default: 0,
    },

    points: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("PointTable", pointTableSchema);
