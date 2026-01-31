const Tariff = require("../models/Tariff");

async function seedTariff() {
  await Tariff.deleteMany();

  const data = [

    // LOCAL
    {
      tariffType: "local",
      vehicleType: "mini",
      acType: "nonAc",
      baseKm: 3,
      baseFare: 200,
      extraPerKm: 25,
      waitingPerMinute: 4,
    },
    {
      tariffType: "local",
      vehicleType: "sedan",
      acType: "nonAc",
      baseKm: 3,
      baseFare: 200,
      extraPerKm: 25,
      waitingPerMinute: 4,
    },
    {
      tariffType: "local",
      vehicleType: "suv",
      acType: "nonAc",
      baseKm: 3,
      baseFare: 300,
      extraPerKm: 30,
      waitingPerMinute: 6,
    },

    // DAY RENT (200KM / 12 HOURS)
    {
      tariffType: "dayRent",
      vehicleType: "sedan",
      acType: "nonAc",
      baseKm: 200,
      baseFare: 3200,
      extraPerKm: 13,
    },
    {
      tariffType: "dayRent",
      vehicleType: "sedan",
      acType: "ac",
      baseKm: 200,
      baseFare: 3400,
      extraPerKm: 14,
    },
    {
      tariffType: "dayRent",
      vehicleType: "suv",
      acType: "nonAc",
      baseKm: 200,
      baseFare: 4400,
      extraPerKm: 16,
    },
    {
      tariffType: "dayRent",
      vehicleType: "suv",
      acType: "ac",
      baseKm: 200,
      baseFare: 4600,
      extraPerKm: 17,
    },

    // OUTSTATION
    {
      tariffType: "outstation",
      vehicleType: "sedan",
      acType: "nonAc",
      extraPerKm: 13,
    },
    {
      tariffType: "outstation",
      vehicleType: "sedan",
      acType: "ac",
      extraPerKm: 14,
    },
    {
      tariffType: "outstation",
      vehicleType: "suv",
      acType: "nonAc",
      extraPerKm: 16,
    },
    {
      tariffType: "outstation",
      vehicleType: "suv",
      acType: "ac",
      extraPerKm: 17,
    },

  ];

  await Tariff.insertMany(data);
  console.log("Tariff Seeded Successfully");
}

module.exports = seedTariff;
