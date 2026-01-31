exports.templates = {
  bookingConfirmed: (booking) => ({
    BOOKING_ID: booking._id,
    PICKUP: booking.pickup,
    DROP: booking.drop
  }),

  driverAssignedCustomer: (booking, driver) => ({
    DRIVER_NAME: driver.name,
    DRIVER_PHONE: driver.phone,
    VEHICLE: driver.vehicleNumber
  }),

  rideCompleted: (booking) => ({
    TOTAL: booking.totalAmount,
    INVOICE: `${process.env.BACKEND_URL}/api/bookings/${booking._id}/invoice`,
    FEEDBACK: `${process.env.FRONTEND_URL}/feedback/${booking._id}`
  })
};
