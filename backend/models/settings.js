const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  baseFare: { type: Number, default: 20 },
  perKmRate: { type: Number, default: 15 },
  driverCommission: { type: Number, default: 70 } // %
});

module.exports = mongoose.model("Settings", settingsSchema);
