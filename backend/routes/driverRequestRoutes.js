const express = require("express");
const router = express.Router();
const DriverRequest = require("../models/DriverRequest");
const Driver = require("../models/Driver");
const { protect } = require("../middleware/authMiddleware");

// Create request (public)
router.post("/", async (req, res) => {
  const request = await DriverRequest.create(req.body);
  res.json(request);
});

// Get all requests (admin only)
router.get("/", protect, async (req, res) => {
  const requests = await DriverRequest.find();
  res.json(requests);
});

// Approve request
router.put("/:id/approve", protect, async (req, res) => {
  const request = await DriverRequest.findById(req.params.id);

  if (!request) return res.status(404).json({ msg: "Not found" });

  // Create driver
  await Driver.create({
    name: request.name,
    phone: request.phone,
    vehicleNumber: request.vehicleNumber,
    status: "Available"
  });

  request.status = "Approved";
  await request.save();

  res.json({ msg: "Driver approved" });
});

// Reject request
router.put("/:id/reject", protect, async (req, res) => {
  const request = await DriverRequest.findById(req.params.id);

  if (!request) return res.status(404).json({ msg: "Not found" });

  request.status = "Rejected";
  await request.save();

  res.json({ msg: "Driver rejected" });
});

module.exports = router;
