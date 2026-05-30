const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    tournamentName: {
      type: String,
      required: true,
      unique: true,
    },

    entryFee: {
      type: Number,
      required: true,
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Tournament", tournamentSchema);
