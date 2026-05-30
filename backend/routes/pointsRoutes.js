const express = require("express");

const { getPointsTable } = require("../controllers/pointsController");

const router = express.Router();

router.get("/", getPointsTable);

module.exports = router;
