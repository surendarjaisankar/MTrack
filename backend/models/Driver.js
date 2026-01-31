const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: String,
  phone: String,
  vehicleNumber: String,

  status: {
    type: String,
    enum: ["Available", "Offline", "OnTrip"],
    default: "Offline",
  },
});

module.exports = mongoose.model("Driver", driverSchema);
