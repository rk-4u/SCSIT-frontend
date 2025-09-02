import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AttendanceForm from './components/AttendanceForm';
import ViewAttendance from './components/ViewAttendance';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4 max-w-4xl min-h-screen flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<AttendanceForm />} />
            <Route path="/view" element={<ViewAttendance />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
