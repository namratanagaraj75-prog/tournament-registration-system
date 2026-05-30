const Registration = require("../models/Registration");
const Fixture = require("../models/Fixture");

// Register Team
const registerTournament = async (req, res) => {
  try {
    const registration = await Registration.create(req.body);

    res.status(201).json({
      success: true,
      data: registration,
      message: "Team Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Teams
const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find();

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Team
const updateRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    res.status(200).json({
      success: true,
      data: registration,
      message: "Team updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Team
const deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    const fixtureExists = await Fixture.findOne({
      $or: [{ teamA: registration.teamName }, { teamB: registration.teamName }],
    });

    if (fixtureExists) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete team after fixtures are generated",
      });
    }

    await Registration.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Team deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark Payment as Paid
const markAsPaid = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus: "Paid",
      },
      {
        new: true,
      },
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    res.status(200).json({
      success: true,
      data: registration,
      message: "Payment Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerTournament,
  getRegistrations,
  updateRegistration,
  deleteRegistration,
  markAsPaid,
};
