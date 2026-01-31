const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerName: String,
    customerPhone: String,
    pickup: String,
    drop: String,

    tripType: {
      type: String,
      enum: ["Local", "DayRent", "Outstation", "Package"],
      default: "Local"
    },

    vehicleCategory: {
      type: String,
      enum: ["Mini", "Sedan", "SUV"],
      default: "Mini"
    },

    acType: {
      type: String,
      enum: ["AC", "Non-AC"],
      default: "AC"
    },

    waitingMinutes: { type: Number, default: 0 },
haltType: {
  type: String,
  enum: ["DayHalt", "NightHalt"],
  default: null
},
toll: { type: Number, default: 0 },
otherCharges: { type: Number, default: 0 },

    distanceKm: Number,
    fare: Number,
    tax: Number,
    totalAmount: Number,
    paymentMethod: String,

    status: {
      type: String,
      enum: ["New", "Assigned", "Completed", "Cancelled"],
      default: "New"
    },

    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
