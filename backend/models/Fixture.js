const mongoose = require("mongoose");

const fixtureSchema = new mongoose.Schema(
  {
    teamA: String,
    teamB: String,
    tournamentName: String,
    matchDate: String,
    winner: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Fixture", fixtureSchema);
