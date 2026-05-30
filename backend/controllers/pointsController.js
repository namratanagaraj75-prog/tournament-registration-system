const Fixture = require("../models/Fixture");

const getPointsTable = async (req, res) => {
  try {
    const fixtures = await Fixture.find();

    const table = {};

    fixtures.forEach((match) => {
      const teamA = match.teamA;
      const teamB = match.teamB;

      if (!table[teamA]) {
        table[teamA] = {
          teamName: teamA,
          played: 0,
          won: 0,
          lost: 0,
          points: 0,
        };
      }

      if (!table[teamB]) {
        table[teamB] = {
          teamName: teamB,
          played: 0,
          won: 0,
          lost: 0,
          points: 0,
        };
      }

      if (match.winner && match.winner !== "Pending") {
        table[teamA].played++;
        table[teamB].played++;

        if (match.winner === teamA) {
          table[teamA].won++;
          table[teamA].points += 3;

          table[teamB].lost++;
        } else {
          table[teamB].won++;
          table[teamB].points += 3;

          table[teamA].lost++;
        }
      }
    });

    res.status(200).json({
      success: true,
      data: Object.values(table),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPointsTable,
};
