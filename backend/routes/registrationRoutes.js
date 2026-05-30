const express = require("express");

const router = express.Router();

const {
  registerTournament,
  getRegistrations,
} = require("../controllers/registrationController");

router.post("/register", registerTournament);

router.get("/all", getRegistrations);

module.exports = router;
