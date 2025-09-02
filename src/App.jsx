import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AttendanceForm from './components/AttendanceForm';
import ViewAttendance from './components/ViewAttendance';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4 max-w-4xl">
        <Routes>
          <Route path="/" element={<AttendanceForm />} />
          <Route path="/view" element={<ViewAttendance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;