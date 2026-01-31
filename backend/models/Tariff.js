const mongoose = require("mongoose");

const tariffSchema = new mongoose.Schema({
  tariffType: {
    type: String,
    enum: ["local", "dayRent", "outstation", "package"],
    required: true,
  },

  vehicleType: {
    type: String,
    enum: ["mini", "sedan", "suv"],
    required: true,
  },

  acType: {
    type: String,
    enum: ["ac", "nonAc"],
    required: true,
  },

  baseKm: Number,
  baseFare: Number,
  extraPerKm: Number,

  waitingPerMinute: Number, // for local
  waitingPerHour: Number,   // for package

}, { timestamps: true });

module.exports = mongoose.model("Tariff", tariffSchema);
