const HealthRecordDetail = ({ record,close }) => {
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
  <div className="bg-white p-6 rounded-lg shadow-lg w-96">
    <h2 className="text-2xl font-semibold mb-4">Health Record Details</h2>
    <div className="mb-4">
      <p>Date: {record.date}</p>
      <p>Temperature: {record.temperature}°C</p>
      <p>Blood Pressure: {record.bloodPressure}</p>
      <p>Heart Rate: {record.heartRate} bpm</p>
    </div>
    <button
      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
      onClick={close}
    >
      Close
    </button>
  </div>
</div>

  );
};

export default HealthRecordDetail;
