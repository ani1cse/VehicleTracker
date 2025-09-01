// src/utils/api.js
import axios from 'axios';

const API_URL = 'https://api.jsonbin.io/v3/b/68b3294a43b1c97be930f889';
const API_KEY = '$2a$10$g1kqJpzAdMvBv8./6ZwR7Od3ohSGRq6Db298bV.rCDwkohvSfPNrG';

export const fetchVehicles = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'X-Master-Key': API_KEY,
      },
    });
    return response.data.record;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};

export const addVehicle = async (vehicle) => {
  try {
    const response = await axios.post(API_URL, vehicle, {
      headers: {
        'X-Master-Key': API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding vehicle:', error);
  }
};

export const updateVehicle = async (vehicleId, updatedVehicle) => {
  try {
    const response = await axios.put(`${API_URL}/${vehicleId}`, updatedVehicle, {
      headers: {
        'X-Master-Key': API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating vehicle:', error);
  }
};

export const deleteVehicle = async (vehicleId) => {
  try {
    const response = await axios.delete(`${API_URL}/${vehicleId}`, {
      headers: {
        'X-Master-Key': API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting vehicle:', error);
  }
};
