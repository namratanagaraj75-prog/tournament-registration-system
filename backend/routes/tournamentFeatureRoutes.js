const express = require("express");

const {
  createWinner,
  deleteWinner,
  generateFixtures,
  getFixtures,
  getMatches,
  getPayments,
  getPoints,
  getWinners,
  updateMatch,
  updatePayment,
  updateWinner,
} = require("../controllers/tournamentFeatureController");

const router = express.Router();

router.get("/payments", getPayments);
router.put("/payments/:id", updatePayment);

router.post("/fixtures/generate", generateFixtures);
router.get("/fixtures", getFixtures);

router.get("/matches", getMatches);
router.put("/matches/:id", updateMatch);

router.get("/points", getPoints);

router.get("/winners", getWinners);
router.post("/winners", createWinner);
router.put("/winners/:id", updateWinner);
router.delete("/winners/:id", deleteWinner);

module.exports = router;
