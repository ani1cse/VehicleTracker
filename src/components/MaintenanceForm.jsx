import React, { useState } from 'react';
import { saveMaintenance } from '../api/jsonbin';

export default function MaintenanceForm() {
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState('');
  const [odo, setOdo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecord = {
      description,
      cost: parseFloat(cost),
      date, // already in YYYY-MM-DD format from input[type=date]
      odo: parseInt(odo, 10)
    };

    await saveMaintenance(newRecord);

    // Clear form
    setDescription('');
    setCost('');
    setDate('');
    setOdo('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Maintenance Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Cost"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="ODO Reading"
        value={odo}
        onChange={(e) => setOdo(e.target.value)}
        required
      />
      <button type="submit">Add Maintenance</button>
    </form>
  );
}
