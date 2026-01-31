const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");
const { protect } = require("../middleware/authMiddleware");

// Get settings
router.get("/", protect, async (req, res) => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({});
  }

  res.json(settings);
});

// Update settings
router.put("/", protect, async (req, res) => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create(req.body);
  } else {
    settings.baseFare = req.body.baseFare;
    settings.perKmRate = req.body.perKmRate;
    settings.driverCommission = req.body.driverCommission;
    await settings.save();
  }

  res.json(settings);
});

module.exports = router;
