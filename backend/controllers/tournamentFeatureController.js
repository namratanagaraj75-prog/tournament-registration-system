const Fixture = require("../models/Fixture");
const Match = require("../models/Match");
const PointTable = require("../models/PointTable");
const Team = require("../models/Team");
const Winner = require("../models/Winner");

const sendError = (res, error, status = 500) => {
  res.status(status).json({
    success: false,
    message: error.message || error,
  });
};

const rebuildPointsTable = async (tournamentName) => {
  const teams = await Team.find({ tournamentName });
  const completedMatches = await Match.find({
    tournamentName,
    status: "Completed",
  });

  const rows = new Map();

  teams.forEach((team) => {
    rows.set(team.teamName, {
      tournamentName,
      teamName: team.teamName,
      played: 0,
      won: 0,
      lost: 0,
      draw: 0,
      points: 0,
      scoreFor: 0,
      scoreAgainst: 0,
    });
  });

  completedMatches.forEach((match) => {
    if (!rows.has(match.teamA) || !rows.has(match.teamB)) {
      return;
    }

    const teamA = rows.get(match.teamA);
    const teamB = rows.get(match.teamB);

    teamA.played += 1;
    teamB.played += 1;
    teamA.scoreFor += match.teamAScore;
    teamA.scoreAgainst += match.teamBScore;
    teamB.scoreFor += match.teamBScore;
    teamB.scoreAgainst += match.teamAScore;

    if (match.teamAScore > match.teamBScore) {
      teamA.won += 1;
      teamA.points += 2;
      teamB.lost += 1;
    } else if (match.teamBScore > match.teamAScore) {
      teamB.won += 1;
      teamB.points += 2;
      teamA.lost += 1;
    } else {
      teamA.draw += 1;
      teamB.draw += 1;
      teamA.points += 1;
      teamB.points += 1;
    }
  });

  await PointTable.deleteMany({ tournamentName });

  if (rows.size === 0) {
    return [];
  }

  return PointTable.insertMany([...rows.values()]);
};

const getPayments = async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    sendError(res, error);
  }
};

const updatePayment = async (req, res) => {
  try {
    const { paymentStatus, paymentMethod, transactionId, entryFee } = req.body;

    const update = {
      paymentStatus,
      paymentMethod,
      transactionId,
      entryFee,
    };

    if (paymentStatus === "Paid") {
      update.paymentDate = new Date();
    }

    const team = await Team.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!team) {
      return sendError(res, "Team not found", 404);
    }

    res.status(200).json({
      success: true,
      data: team,
      message: "Payment updated successfully",
    });
  } catch (error) {
    sendError(res, error);
  }
};

const generateFixtures = async (req, res) => {
  try {
    const { tournamentName } = req.body;

    if (!tournamentName) {
      return sendError(res, "Tournament name is required", 400);
    }

    const paidTeams = await Team.find({
      tournamentName,
      paymentStatus: "Paid",
    }).sort({ createdAt: 1 });

    if (paidTeams.length < 2) {
      return sendError(res, "At least two paid teams are required", 400);
    }

    await Fixture.deleteMany({ tournamentName });
    await Match.deleteMany({ tournamentName });

    const fixtures = [];
    const matches = [];
    const firstMatchDate = new Date();
    firstMatchDate.setDate(firstMatchDate.getDate() + 1);
    firstMatchDate.setHours(10, 0, 0, 0);

    let round = 1;

    for (let i = 0; i < paidTeams.length; i += 1) {
      for (let j = i + 1; j < paidTeams.length; j += 1) {
        const teamA = paidTeams[i].teamName;
        const teamB = paidTeams[j].teamName;
        const scheduledAt = new Date(firstMatchDate);

        scheduledAt.setDate(firstMatchDate.getDate() + round - 1);

        fixtures.push({
          tournamentName,
          round,
          teamA,
          teamB,
        });

        matches.push({
          tournamentName,
          round,
          teamA,
          teamB,
          scheduledAt,
          venue: "TBD",
        });

        round += 1;
      }
    }

    const createdFixtures = await Fixture.insertMany(fixtures);
    const createdMatches = await Match.insertMany(matches);

    await rebuildPointsTable(tournamentName);

    res.status(201).json({
      success: true,
      fixtures: createdFixtures,
      matches: createdMatches,
      message: "Fixtures generated successfully",
    });
  } catch (error) {
    sendError(res, error);
  }
};

const getFixtures = async (req, res) => {
  try {
    const filter = req.query.tournamentName
      ? { tournamentName: req.query.tournamentName }
      : {};
    const fixtures = await Fixture.find(filter).sort({ round: 1 });

    res.status(200).json({
      success: true,
      data: fixtures,
    });
  } catch (error) {
    sendError(res, error);
  }
};

const getMatches = async (req, res) => {
  try {
    const filter = req.query.tournamentName
      ? { tournamentName: req.query.tournamentName }
      : {};
    const matches = await Match.find(filter).sort({ scheduledAt: 1 });

    res.status(200).json({
      success: true,
      data: matches,
    });
  } catch (error) {
    sendError(res, error);
  }
};

const updateMatch = async (req, res) => {
  try {
    const { scheduledAt, venue, teamAScore, teamBScore, status } = req.body;
    const existingMatch = await Match.findById(req.params.id);

    if (!existingMatch) {
      return sendError(res, "Match not found", 404);
    }

    const update = {
      scheduledAt,
      venue,
      teamAScore,
      teamBScore,
      status,
    };

    if (status === "Completed") {
      if (Number(teamAScore) > Number(teamBScore)) {
        update.winnerTeamName = existingMatch.teamA;
      } else if (Number(teamBScore) > Number(teamAScore)) {
        update.winnerTeamName = existingMatch.teamB;
      } else {
        update.winnerTeamName = "Draw";
      }
    }

    const match = await Match.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (match.status === "Completed") {
      await Fixture.findOneAndUpdate(
        {
          tournamentName: match.tournamentName,
          round: match.round,
          teamA: match.teamA,
          teamB: match.teamB,
        },
        { status: "Completed" },
      );
    }

    await rebuildPointsTable(match.tournamentName);

    res.status(200).json({
      success: true,
      data: match,
      message: "Match updated successfully",
    });
  } catch (error) {
    sendError(res, error);
  }
};

const getPoints = async (req, res) => {
  try {
    const filter = req.query.tournamentName
      ? { tournamentName: req.query.tournamentName }
      : {};
    const points = await PointTable.find(filter).sort({
      points: -1,
      won: -1,
      scoreFor: -1,
    });

    res.status(200).json({
      success: true,
      data: points,
    });
  } catch (error) {
    sendError(res, error);
  }
};

const getWinners = async (req, res) => {
  try {
    const winners = await Winner.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: winners,
    });
  } catch (error) {
    sendError(res, error);
  }
};

const createWinner = async (req, res) => {
  try {
    const winner = await Winner.create(req.body);

    res.status(201).json({
      success: true,
      data: winner,
      message: "Winner saved successfully",
    });
  } catch (error) {
    sendError(res, error);
  }
};

const updateWinner = async (req, res) => {
  try {
    const winner = await Winner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!winner) {
      return sendError(res, "Winner not found", 404);
    }

    res.status(200).json({
      success: true,
      data: winner,
      message: "Winner updated successfully",
    });
  } catch (error) {
    sendError(res, error);
  }
};

const deleteWinner = async (req, res) => {
  try {
    const winner = await Winner.findByIdAndDelete(req.params.id);

    if (!winner) {
      return sendError(res, "Winner not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Winner deleted successfully",
    });
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = {
  getPayments,
  updatePayment,
  generateFixtures,
  getFixtures,
  getMatches,
  updateMatch,
  getPoints,
  getWinners,
  createWinner,
  updateWinner,
  deleteWinner,
};
