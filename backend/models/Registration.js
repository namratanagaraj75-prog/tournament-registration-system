const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },

    captainName: {
      type: String,
      required: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    tournamentName: {
      type: String,
      required: true,
    },

    entryFee: {
      type: Number,
      default: 500,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Registration", registrationSchema);
