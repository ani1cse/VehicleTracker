const BIN_ID = "68b3294a43b1c97be930f889";
const API_KEY = "$2a$10$g1kqJpzAdMvBv8./6ZwR7Od3ohSGRq6Db298bV.rCDwkohvSfPNrG"; 

// Fetch all vehicles
export const fetchVehicles = async () => {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  return data.record.vehicles || [];
};

// Save all vehicles (overwrites vehicles array but keeps other keys)
export const saveVehicles = async (vehicles) => {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();

  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
      "X-Bin-Versioning": "false",
    },
    body: JSON.stringify({
      ...data.record,
      vehicles,
    }),
  });
};

// Add maintenance to a specific vehicle by ID
export const saveMaintenance = async (vehicleId, newRecord) => {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  const vehicles = data.record.vehicles || [];

  const updatedVehicles = vehicles.map((v) => {
    if (v.id === vehicleId) {
      return {
        ...v,
        maintenance: [
          ...(v.maintenance || []),
          { ...newRecord, id: Date.now() }
        ]
      };
    }
    return v;
  });

  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
      "X-Bin-Versioning": "false",
    },
    body: JSON.stringify({
      ...data.record,
      vehicles: updatedVehicles,
    }),
  });

  return updatedVehicles;
};
