const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  rating: Number,
  review: String,
});

module.exports = mongoose.model("Feedback", feedbackSchema);
