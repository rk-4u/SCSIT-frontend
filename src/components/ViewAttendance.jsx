import React, { useState } from 'react';

const ViewAttendance = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendances, setAttendances] = useState([]);

  const fetchData = () => {
    fetch(`https://scsit-backend.onrender.com/api/attendance?date=${date}`)
      .then(res => res.json())
      .then(data => setAttendances(data));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">View Attendance</h1>
      <div className="w-full max-w-md mb-4 flex">
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="flex-1 p-2 border rounded-l"
        />
        <button onClick={fetchData} className="bg-blue-500 text-white px-4 py-2 rounded-r">
          Fetch
        </button>
      </div>
      {attendances.map(att => (
        <div key={att._id} className="w-full mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {att.subject} - {new Date(att.timestamp).toLocaleString()}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Roll</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {att.attendances.map(a => (
                  <tr key={a.student._id}>
                    <td className="p-2 border">{a.student.rollNo}</td>
                    <td className="p-2 border">{a.student.name}</td>
                    <td className="p-2 border">{a.present ? 'Present' : 'Absent'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      {attendances.length === 0 && <p className="text-gray-500">No data for this date.</p>}
    </div>
  );
};

export default ViewAttendance;