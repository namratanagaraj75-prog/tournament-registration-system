const express = require("express");

const router = express.Router();

const { createTeam, getTeams } = require("../controllers/teamController");

router.post("/create", createTeam);

router.get("/all", getTeams);

module.exports = router;
