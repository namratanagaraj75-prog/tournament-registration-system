exports.createTeam = (req, res) => {
  res.json({
    success: true,
    message: "Team Created Successfully",
  });
};

exports.getTeams = (req, res) => {
  res.json({
    success: true,
    message: "All Teams Fetched",
  });
};
