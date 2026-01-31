const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const controller = require("../controllers/reportController");

// Advanced Report
router.get("/advanced", protect, controller.advancedReport);

// Daily Report
router.get("/daily", protect, controller.dailyReport);

module.exports = router;
