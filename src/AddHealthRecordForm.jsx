import React, { useState } from 'react';

const AddHealthRecordForm = ({ addRecord }) => {
  const [formData, setFormData] = useState({
    date: '',
    temperature: '',
    bloodPressure: '',
    heartRate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecord(formData);
    setFormData({ date: '', temperature: '', bloodPressure: '', heartRate: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4">Add Health Record</h2>
  
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Date</label>
      <input
        type="date"
        name="date"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        value={formData.date}
        onChange={handleChange}
        required
      />
    </div>
  
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
      <input
        type="number"
        name="temperature"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder="Temperature in °C"
        value={formData.temperature}
        onChange={handleChange}
        required
      />
    </div>
  
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Blood Pressure (systolic/diastolic)</label>
      <input
        type="text"
        name="bloodPressure"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder="120/80"
        value={formData.bloodPressure}
        onChange={handleChange}
        required
      />
    </div>
  
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Heart Rate (bpm)</label>
      <input
        type="number"
        name="heartRate"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder="Heart Rate in bpm"
        value={formData.heartRate}
        onChange={handleChange}
        required
      />
    </div>
  
    <button
      type="submit"
      className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
    >
      Submit
    </button>
  </form>
  
  );
};

export default AddHealthRecordForm;
