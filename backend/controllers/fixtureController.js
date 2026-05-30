const Fixture = require("../models/Fixture");
const Registration = require("../models/Registration");

// Generate Round Robin Fixtures
const generateFixtures = async (req, res) => {
  try {
    const teams = await Registration.find();

    if (teams.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Minimum 2 teams required",
      });
    }

    await Fixture.deleteMany({});

    const fixtures = [];

    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        fixtures.push({
          teamA: teams[i].teamName,
          teamB: teams[j].teamName,
          tournamentName: teams[i].tournamentName,
          matchDate: new Date().toISOString().split("T")[0],
          winner: "Pending",
        });
      }
    }

    const createdFixtures = await Fixture.insertMany(fixtures);

    res.status(201).json({
      success: true,
      count: createdFixtures.length,
      data: createdFixtures,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Fixtures
const getFixtures = async (req, res) => {
  try {
    const fixtures = await Fixture.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: fixtures.length,
      data: fixtures,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Select Winner
const selectWinner = async (req, res) => {
  try {
    const fixture = await Fixture.findById(req.params.id);

    if (!fixture) {
      return res.status(404).json({
        success: false,
        message: "Fixture not found",
      });
    }

    fixture.winner = req.body.winner;

    await fixture.save();

    res.status(200).json({
      success: true,
      message: "Winner updated successfully",
      data: fixture,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateFixtures,
  getFixtures,
  selectWinner,
};
