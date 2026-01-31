require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const driverRoutes = require("./routes/driverRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/fare", require("./routes/fareRoutes"));
app.use("/api/tariff", require("./routes/tariffRoutes"));
app.use("/api/drivers", require("./routes/driverRoutes"));
app.use("/api/auth", authRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/driver-requests", require("./routes/driverRequestRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/api/tariffs", require("./routes/tariffRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
