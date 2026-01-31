const Booking = require("../models/Booking");
const Driver = require("../models/Driver");
const Settings = require("../models/Settings");
const calculateFare = require("../services/tariffEngine");
const sms = require("../services/smsService");

/* =====================================================
   CREATE BOOKING
===================================================== */
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      haltType: req.body.haltType || null,
      waitingMinutes: Number(req.body.waitingMinutes) || 0,
    });

    // Send Booking Confirmation SMS
    await sms.sendBookingConfirmed(booking);

    res.status(201).json(booking);

  } catch (err) {
    console.error("Create Booking Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


/* =====================================================
   GET ALL BOOKINGS
===================================================== */
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("assignedDriver")
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {
    console.error("Get Bookings Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


/* =====================================================
   ASSIGN DRIVER
===================================================== */
exports.assignDriver = async (req, res) => {
  try {
    const { bookingId, driverId } = req.params;

    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ msg: "Driver not found" });
    }

    // Update driver status
    driver.status = "OnTrip";
    await driver.save();

    // Update booking
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { assignedDriver: driverId, status: "Assigned" },
      { new: true }
    ).populate("assignedDriver");

    // Send SMS to customer & driver
    await sms.sendDriverAssigned(booking, driver);

    res.json(booking);

  } catch (err) {
    console.error("Assign Driver Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


/* =====================================================
   START RIDE
===================================================== */
exports.startRide = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "Started" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    res.json(booking);

  } catch (err) {
    console.error("Start Ride Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


/* =====================================================
   COMPLETE RIDE
===================================================== */
exports.completeRide = async (req, res) => {
  try {
    const { distanceKm, paymentMethod } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    const settings = await Settings.findOne();
let result;

try {
  result = calculateFare({
    tripType: booking.tripType,
    vehicleCategory: booking.vehicleCategory,
    distanceKm: Number(distanceKm),
    waitingMinutes: booking.waitingMinutes,
    haltType: booking.haltType,
    settings
  });
} catch (error) {
  return res.status(400).json({
    error: "Tariff not configured. Please configure pricing."
  });
}


    booking.distanceKm = Number(distanceKm);
    booking.fare = result.fare;
    booking.tax = result.tax;
    booking.totalAmount = result.totalAmount;
    booking.paymentMethod = paymentMethod;
    booking.status = "Completed";

    await booking.save();

    // Driver Earnings Calculation
    const commission = settings?.driverCommission || 70;
    const driverShare = result.totalAmount * (commission / 100);

    await Driver.findByIdAndUpdate(booking.assignedDriver, {
      status: "Available",
      $inc: {
        totalTrips: 1,
        totalEarnings: driverShare
      }
    });

    // Send Completion SMS
    await sms.sendRideCompleted(booking);

    res.json(booking);

  } catch (err) {
    console.error("Complete Ride Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
