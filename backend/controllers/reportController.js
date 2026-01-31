exports.dailyReport = async (req, res) => {
  const Booking = require("../models/Booking");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const rides = await Booking.find({
    createdAt: { $gte: today },
    status: "Completed"
  });

  const totalRevenue = rides.reduce(
    (sum, r) => sum + r.totalAmount,
    0
  );

  res.json({
    totalTrips: rides.length,
    totalRevenue
  });
};

exports.advancedReport = async (req, res) => {
  const Booking = require("../models/Booking");
  const Driver = require("../models/Driver");

  const completedRides = await Booking.find({ status: "Completed" });

  const totalRevenue = completedRides.reduce(
    (sum, ride) => sum + ride.totalAmount,
    0
  );

  const paymentStats = {};
  completedRides.forEach(ride => {
    paymentStats[ride.paymentMethod] =
      (paymentStats[ride.paymentMethod] || 0) + ride.totalAmount;
  });

  const tripsPerDay = {};
  completedRides.forEach(ride => {
    const date = ride.createdAt.toISOString().split("T")[0];
    tripsPerDay[date] = (tripsPerDay[date] || 0) + 1;
  });

  const drivers = await Driver.find();

  res.json({
    totalRevenue,
    paymentStats,
    tripsPerDay,
    drivers
  });
};
