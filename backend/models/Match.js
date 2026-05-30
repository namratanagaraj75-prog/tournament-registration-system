const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    tournamentName: {
      type: String,
      required: true,
    },

    round: {
      type: Number,
      required: true,
    },

    teamA: {
      type: String,
      required: true,
    },

    teamB: {
      type: String,
      required: true,
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    venue: {
      type: String,
      default: "TBD",
    },

    teamAScore: {
      type: Number,
      default: 0,
    },

    teamBScore: {
      type: Number,
      default: 0,
    },

    winnerTeamName: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Scheduled", "Completed"],
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Match", matchSchema);
