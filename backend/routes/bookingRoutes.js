const express = require("express");
const Booking = require("../models/Booking");
const Driver = require("../models/Driver");

const router = express.Router();

/* ASSIGN DRIVER */
router.put("/:bookingId/assign/:driverId", async (req, res) => {
  const { bookingId, driverId } = req.params;

  const booking = await Booking.findById(bookingId);

  booking.assignedDriver = driverId;
  booking.status = "Assigned";

  await booking.save();

  // Change driver status to OnTrip
  await Driver.findByIdAndUpdate(driverId, {
    status: "OnTrip",
  });

  const updatedBooking = await Booking.findById(bookingId)
    .populate("assignedDriver");

  res.json(updatedBooking);
});

/* COMPLETE RIDE */
router.put("/:id/complete", async (req, res) => {
const { distanceKm, paymentMethod, toll, otherCharges } = req.body;
booking.toll = toll || 0;
booking.otherCharges = otherCharges || 0;

  const booking = await Booking.findById(req.params.id)
    .populate("assignedDriver");

  // Example fare calculation
  const fare = distanceKm * 15;
  const tax = fare * 0.05;
const totalAmount = baseFare + tax + toll + otherCharges;

  booking.status = "Completed";
  booking.distanceKm = distanceKm;
  booking.paymentMethod = paymentMethod;
  booking.fare = fare;
  booking.tax = tax;
  booking.totalAmount = totalAmount;

  await booking.save();

  await Driver.findByIdAndUpdate(
    booking.assignedDriver._id,
    { status: "Available" }
  );

  res.json(booking);
});


module.exports = router;
