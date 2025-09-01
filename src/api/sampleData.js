export const sampleVehicles = [
  {
    id: "1",
    number: "KA01AB1234",
    odo: 12000,
    fuelLogs: [
      { date: "2025-08-30", odo: 12000, amount: 40, price: 50 },
      { date: "2025-08-31", odo: 12100, amount: 30, price: 40 },
    ],
    maintenance: [
      { date: "2025-08-28", type: "Oil Change", cost: 1500 },
    ],
    expenses: [
      { date: "2025-08-29", type: "Parking", cost: 200 },
    ],
  },
];
