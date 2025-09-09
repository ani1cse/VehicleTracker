const BIN_ID = "68b3294a43b1c97be930f889";
const API_KEY = "$2a$10$g1kqJpzAdMvBv8./6ZwR7Od3ohSGRq6Db298bV.rCDwkohvSfPNrG"; 

export const fetchVehicles = async () => {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  return data.record.vehicles || [];
};

export const saveVehicles = async (vehicles) => {
  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
      "X-Bin-Versioning": "false",
    },
    body: JSON.stringify({ vehicles }),
  });
};
