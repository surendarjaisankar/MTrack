const Tariff = require("../models/Tariff");

async function calculateFare({
  tariffType,
  vehicleType,
  acType,
  distance,
  waitingMinutes = 0,
  driverBatta = false,
  dayHalt = false,
  nightHalt = false,
}) {

  const tariff = await Tariff.findOne({
    tariffType,
    vehicleType,
    acType,
  });

  if (!tariff) throw new Error("Tariff not found");

  let total = 0;

  if (tariffType === "local") {
    total = tariff.baseFare;

    if (distance > tariff.baseKm) {
      total += (distance - tariff.baseKm) * tariff.extraPerKm;
    }

    total += waitingMinutes * tariff.waitingPerMinute;
  }

  if (tariffType === "dayRent") {
    total = tariff.baseFare;

    if (distance > tariff.baseKm) {
      total += (distance - tariff.baseKm) * tariff.extraPerKm;
    }
  }

  if (tariffType === "outstation") {
    total = distance * tariff.extraPerKm;

    if (driverBatta) total += 500;
    if (dayHalt) total += 1200;
    if (nightHalt) total += 700;
  }

  return total;
}

module.exports = calculateFare;
