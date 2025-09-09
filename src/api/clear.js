const BIN_ID = "68b3294a43b1c97be930f889";
const API_KEY = "$2a$10$g1kqJpzAdMvBv8./6ZwR7Od3ohSGRq6Db298bV.rCDwkohvSfPNrG"; 

(async () => {
  // 1. Fetch current bin
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  const record = data.record;

  // 2. Clean each vehicle
  const cleanedVehicles = (record.vehicles || []).map(v => {
    const mergedLogs = [
      ...(v.maintenanceLogs || []),
      ...(v.maintenance || [])
    ];
    return {
      ...v,
      maintenanceLogs: mergedLogs,
      maintenance: undefined // remove old property
    };
  });

  // 3. Remove top-level maintenance array
  delete record.maintenance;

  // 4. Save back to JSONBin
  const saveRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
      "X-Bin-Versioning": "false",
    },
    body: JSON.stringify({
      ...record,
      vehicles: cleanedVehicles
    }),
  });

  const saveData = await saveRes.json();
  console.log("Cleanup complete:", saveData);
})();
