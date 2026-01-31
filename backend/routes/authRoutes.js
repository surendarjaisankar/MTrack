const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

// Routes
router.post("/login", controller.login);
router.post("/register", controller.register);

const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, controller.getMe);
router.put("/update", protect, controller.updateProfile);


module.exports = router;
