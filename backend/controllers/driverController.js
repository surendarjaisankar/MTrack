const Driver = require("../models/Driver");

exports.getDrivers = async (req, res) => {
  const drivers = await Driver.find();
  res.json(drivers);
};

exports.createDriver = async (req, res) => {
  const driver = await Driver.create(req.body);
  res.json(driver);
};

exports.deleteDriver = async (req, res) => {
  await Driver.findByIdAndDelete(req.params.id);
  res.json({ msg: "Driver deleted" });
};

exports.updateStatus = async (req, res) => {
  const driver = await Driver.findById(req.params.id);

  if (!driver) {
    return res.status(404).json({ msg: "Driver not found" });
  }

  driver.status = req.body.status;
  await driver.save();

  res.json(driver);
};
