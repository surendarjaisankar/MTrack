const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  name: String,
  phone: String,
  vehicleNumber: String,
  status: {
    type: String,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



module.exports = mongoose.model("DriverRequest", requestSchema);
