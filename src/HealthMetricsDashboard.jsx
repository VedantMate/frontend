import React, { useState, useEffect } from 'react';
import HealthRecordDetail from './HealthRecordDetail';
import AddHealthRecordForm from './AddHealthRecordForm';
import SearchBar from './SearchBar';

const HealthMetricsDashboard = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState(records); // Initialized to full records
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [editRecordIndex, setEditRecordIndex] = useState(null);
  const [editRecordData, setEditRecordData] = useState({
    date: '',
    temperature: '',
    bloodPressure: '',
    heartRate: ''
  });

  // Sync filtered records with records to avoid search issues
  useEffect(() => {
    setFilteredRecords(records);
  }, [records]);

  // Add a new record
  const addRecord = (newRecord) => {
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
  };

  // Delete a record
  const deleteRecord = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
  };

  // Start editing a record
  const handleEdit = (index) => {
    setEditRecordIndex(index);
    setEditRecordData(records[index]);
  };

  // Save edited record
  const saveEdit = () => {
    const updatedRecords = records.map((record, i) =>
      i === editRecordIndex ? editRecordData : record
    );
    setRecords(updatedRecords);
    setEditRecordIndex(null);
    setEditRecordData({
      date: '',
      temperature: '',
      bloodPressure: '',
      heartRate: ''
    });
  };

  // Handle search functionality
  const handleSearch = (query) => {
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      const filtered = records.filter((record) =>
        record.date.includes(lowercasedQuery) ||
        record.temperature.toString().includes(lowercasedQuery) ||
        record.bloodPressure.includes(lowercasedQuery) ||
        record.heartRate.toString().includes(lowercasedQuery)
      );
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(records); // Reset to all records if query is empty
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Health Metrics Dashboard
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar handleSearch={handleSearch} />
      </div>

      {/* Add Health Record Form */}
      <div className="mb-8">
        <AddHealthRecordForm addRecord={addRecord} />
      </div>

      {/* Health Metrics List */}
      <ul className="space-y-4">
        {filteredRecords.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No health records available.
          </p>
        ) : (
          filteredRecords.map((record, index) => (
            <li
              key={index}
              className="p-6 bg-white shadow-md rounded-lg flex flex-col md:flex-row justify-between items-start"
            >
              {editRecordIndex === index ? (
                // Edit form for the selected record
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-4">
                  <input
                    type="text"
                    value={editRecordData.date}
                    onChange={(e) => setEditRecordData({ ...editRecordData, date: e.target.value })}
                    className="border border-gray-300 p-2 rounded"
                    placeholder="Date"
                  />
                  <input
                    type="number"
                    value={editRecordData.temperature}
                    onChange={(e) => setEditRecordData({ ...editRecordData, temperature: e.target.value })}
                    className="border border-gray-300 p-2 rounded"
                    placeholder="Temperature (°C)"
                  />
                  <input
                    type="text"
                    value={editRecordData.bloodPressure}
                    onChange={(e) => setEditRecordData({ ...editRecordData, bloodPressure: e.target.value })}
                    className="border border-gray-300 p-2 rounded"
                    placeholder="Blood Pressure"
                  />
                  <input
                    type="number"
                    value={editRecordData.heartRate}
                    onChange={(e) => setEditRecordData({ ...editRecordData, heartRate: e.target.value })}
                    className="border border-gray-300 p-2 rounded"
                    placeholder="Heart Rate (bpm)"
                  />
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition"
                    onClick={saveEdit}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <span className="font-medium text-lg text-gray-700">
                    {record.date} - Temp: {record.temperature}°C, BP: {record.bloodPressure}, HR: {record.heartRate} bpm
                  </span>
                  <div className="mt-4 md:mt-0 space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
                      onClick={() => setSelectedRecord(index)}
                    >
                      Details
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
                      onClick={() => deleteRecord(index)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        )}
      </ul>

      {/* Health Record Detail */}
      {selectedRecord !== null && (
        <HealthRecordDetail
          record={records[selectedRecord]}
          index={selectedRecord}
          editRecord={() => handleEdit(selectedRecord)}
          close={() => setSelectedRecord(null)}
        />
      )}
    </div>
  );
};

export default HealthMetricsDashboard;
