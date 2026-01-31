const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const controller = require("../controllers/driverController");

// Create Driver
router.post("/", protect, controller.createDriver);

// Get All Drivers
router.get("/", protect, controller.getDrivers);

// Update Driver Status
router.put("/:id/status", protect, controller.updateStatus);

router.put("/bookings/:bookingId/assign/:driverId", async (req, res) => {
  const { bookingId, driverId } = req.params;

  const booking = await Booking.findById(bookingId);
  booking.assignedDriver = driverId;
  booking.status = "Assigned";

  await booking.save();

  const updatedBooking = await Booking.findById(bookingId)
    .populate("assignedDriver");  // IMPORTANT

  res.json(updatedBooking);
});

// Toggle driver status
router.put("/:id/status", async (req, res) => {
  const { status } = req.body;

  const driver = await Driver.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(driver);
});

// Delete Driver
router.delete("/:id", protect, controller.deleteDriver);

router.put("/drivers/:id/status", async (req, res) => {
  const { status } = req.body;

  const driver = await Driver.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(driver);
});


module.exports = router;
