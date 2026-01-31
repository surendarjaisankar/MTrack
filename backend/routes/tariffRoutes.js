const express = require("express");
const router = express.Router();
const Tariff = require("../models/Tariff");
const { protect } = require("../middleware/authMiddleware");

// Get all tariffs
router.get("/", protect, async (req, res) => {
  const tariffs = await Tariff.find();
  res.json(tariffs);
});

// Create or Update tariff
router.post("/", protect, async (req, res) => {
  const existing = await Tariff.findOne({
    tripType: req.body.tripType,
    vehicleCategory: req.body.vehicleCategory
  });

  if (existing) {
    Object.assign(existing, req.body);
    await existing.save();
    return res.json(existing);
  }

  const tariff = await Tariff.create(req.body);
  res.json(tariff);
});

const calculateFare = require("../services/tariffEngine");

// Estimate fare preview
router.post("/estimate", protect, async (req, res) => {
  try {
    const result = await calculateFare(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.get("/", async (req, res) => {
  const data = await Tariff.find();
  res.json(data);
});

router.put("/:id", async (req, res) => {
  const updated = await Tariff.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

module.exports = router;


module.exports = router;
