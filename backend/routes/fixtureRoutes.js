const express = require("express");

const {
  generateFixtures,
  getFixtures,
  selectWinner,
} = require("../controllers/fixtureController");

const router = express.Router();

router.post("/generate", generateFixtures);

router.get("/all", getFixtures);

router.put("/winner/:id", selectWinner);

module.exports = router;
