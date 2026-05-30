const registrations = [];

exports.registerTournament = (req, res) => {
  const registration = req.body;

  registrations.push(registration);

  res.status(201).json({
    success: true,
    data: registration,
    message: "Team Registered Successfully",
  });
};

exports.getRegistrations = (req, res) => {
  res.status(200).json({
    success: true,
    count: registrations.length,
    data: registrations,
  });
};
