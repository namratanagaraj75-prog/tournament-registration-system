const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const tournamentRoutes = require("./routes/tournamentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const tournamentFeatureRoutes = require("./routes/tournamentFeatureRoutes");
const fixtureRoutes = require("./routes/fixtureRoutes");
const pointsRoutes = require("./routes/pointsRoutes");
const tournamentManagementRoutes = require("./routes/tournamentManagementRoutes");

// API Routes
app.use("/api/registration", tournamentRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/tournament", tournamentFeatureRoutes);

app.use("/api/fixtures", fixtureRoutes);

app.use("/api/points", pointsRoutes);

app.use("/api/tournaments", tournamentManagementRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Tournament Registration System API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
