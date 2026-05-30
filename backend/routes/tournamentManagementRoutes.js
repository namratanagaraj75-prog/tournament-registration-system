const express = require("express");

const {
  createTournament,
  getTournaments,
} = require("../controllers/tournamentManagementController");

const router = express.Router();

router.post("/create", createTournament);

router.get("/all", getTournaments);

module.exports = router;
