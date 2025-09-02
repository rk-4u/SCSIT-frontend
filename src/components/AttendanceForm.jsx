import React, { useState, useEffect } from 'react';

const subjects = [
  'Data Structures using C++',
  'Operating Systems',
  'Computer Organization and Architecture',
  'Mathematical Foundation for Computer Applications',
  'Communication Skills and Report Writing',
];

const AttendanceForm = () => {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [subject, setSubject] = useState(subjects[0]);
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setAttendances(data.map(s => ({ student: s._id, present: true }))); // Default to present
      });
  }, []);

  const handlePresent = (index, present) => {
    const newAtt = [...attendances];
    newAtt[index].present = present;
    setAttendances(newAtt);
  };

  const submit = () => {
    fetch('http://localhost:5000/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, subject, attendances }),
    })
      .then(res => res.json())
      .then(() => alert('Attendance recorded!'));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Record Attendance</h1>
      <div className="w-full max-w-md mb-4">
        <label className="block mb-1">Date:</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="w-full max-w-md mb-4">
        <label className="block mb-1">Subject:</label>
        <select
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {subjects.map(sub => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>
      <ul className="w-full max-w-md overflow-y-auto max-h-96">
        {students.map((s, i) => (
          <li key={s._id} className="flex justify-between items-center mb-2 p-2 border rounded">
            <span className="text-sm">{s.rollNo}. {s.name}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePresent(i, true)}
                className={`px-2 py-1 rounded ${attendances[i]?.present ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              >
                Present
              </button>
              <button
                onClick={() => handlePresent(i, false)}
                className={`px-2 py-1 rounded ${!attendances[i]?.present ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
              >
                Absent
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={submit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Submit Attendance
      </button>
    </div>
  );
};

export default AttendanceForm;