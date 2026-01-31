const provider = require("./msg91Provider");
const { templates } = require("../config/smsTemplates");

exports.sendBookingConfirmed = async (booking) => {
  await provider.send(
    booking.customerPhone,
    templates.bookingConfirmed(booking)
  );
};

exports.sendDriverAssigned = async (booking, driver) => {
  await provider.send(
    booking.customerPhone,
    templates.driverAssignedCustomer(booking, driver)
  );
};

exports.sendRideCompleted = async (booking) => {
  await provider.send(
    booking.customerPhone,
    templates.rideCompleted(booking)
  );
};
