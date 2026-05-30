const express = require("express");

const {
  registerTournament,
  getRegistrations,
  updateRegistration,
  deleteRegistration,
  markAsPaid,
} = require("../controllers/tournamentController");

const router = express.Router();

router.post("/register", registerTournament);

router.get("/all", getRegistrations);

router.put("/update/:id", updateRegistration);

router.put("/pay/:id", markAsPaid);

router.delete("/delete/:id", deleteRegistration);

module.exports = router;
