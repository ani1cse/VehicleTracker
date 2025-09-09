const BIN_ID = "68b3294a43b1c97be930f889";
const API_KEY = "$2a$10$g1kqJpzAdMvBv8./6ZwR7Od3ohSGRq6Db298bV.rCDwkohvSfPNrG"; 

// Fetch vehicles
export const fetchVehicles = async () => {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  return data.record.vehicles || [];
};

// Save vehicles
export const saveVehicles = async (vehicles) => {
  // Get existing data so we don't overwrite maintenance
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

// Fetch maintenance records
export const fetchMaintenance = async () => {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  return data.record.maintenance || [];
};

// Save a new maintenance record
export const saveMaintenance = async (newRecord) => {
  // Get existing data so we don't overwrite vehicles
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();

  const updatedMaintenance = [
    ...(data.record.maintenance || []),
    {
      ...newRecord,
      id: Date.now(), // unique ID
    },
  ];

  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
      "X-Bin-Versioning": "false",
    },
    body: JSON.stringify({
      ...data.record,
      maintenance: updatedMaintenance,
    }),
  });
};
