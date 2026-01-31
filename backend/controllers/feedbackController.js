const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  const feedback = await Feedback.create({
    booking: req.params.bookingId,
    rating: req.body.rating,
    review: req.body.review,
  });

  res.json(feedback);
};
