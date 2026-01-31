const express = require("express");
const calculateFare = require("../utils/fareCalculator");

const router = express.Router();

router.post("/calculate", async (req, res) => {
  try {
    const total = await calculateFare(req.body);
    res.json({ total });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
