const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema(
  {
    tournamentName: {
      type: String,
      required: true,
    },

    winnerTeamName: {
      type: String,
      required: true,
    },

    runnerUpTeamName: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Winner", winnerSchema);
