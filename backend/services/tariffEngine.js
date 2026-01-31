module.exports = function calculateFare({
  tripType,
  vehicleCategory,
  distanceKm,
  waitingMinutes,
  haltType,
  settings
}) {

  const baseFare = settings?.baseFare || 20;
  const perKmRate = settings?.perKmRate || 15;
  const taxPercent = settings?.taxPercent || 5;

  if (!distanceKm || distanceKm <= 0) {
    throw new Error("Invalid distance");
  }

  const fare = baseFare + (distanceKm * perKmRate);
  const tax = fare * (taxPercent / 100);
  const totalAmount = fare + tax;

  return {
    fare,
    tax,
    totalAmount
  };
};
