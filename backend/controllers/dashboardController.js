const getDashboardStats = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Dashboard API Working",
    totalTeams: 0,
    totalTournaments: 0,
  });
};

module.exports = {
  getDashboardStats,
};
