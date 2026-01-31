const express = require("express");
const router = express.Router();
const controller = require("../controllers/feedbackController");

router.post("/:bookingId", controller.submitFeedback);

module.exports = router;
