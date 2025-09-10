const BIN_ID = "68b3294a43b1c97be930f889";
const API_KEY = "$2a$10$g1kqJpzAdMvBv8./6ZwR7Od3ohSGRq6Db298bV.rCDwkohvSfPNrG";

// Fetch full record: vehicles + settings
export const fetchVehicles = async () => {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  return {
    vehicles: data.record.vehicles || [],
    settings: data.record.settings || {},
  };
};

// Save updated vehicles
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

// Save updated settings
export const saveSettings = async (newSettings) => {
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
      settings: { ...data.record.settings, ...newSettings },
    }),
  });
};

// Save maintenance log for a specific vehicle
export const saveMaintenance = async (vehicleId, newRecord) => {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  const vehicles = data.record.vehicles || [];

  const updatedVehicles = vehicles.map((v) =>
    v.id === vehicleId
      ? {
          ...v,
          maintenanceLogs: [
            ...(v.maintenanceLogs || []),
            { ...newRecord, id: Date.now() },
          ],
        }
      : v
  );

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