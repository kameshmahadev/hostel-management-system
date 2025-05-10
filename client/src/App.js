import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentsPage from "./pages/StudentsPage";
import RoomsPage from "./pages/RoomsPage";
import BookingsPage from "./pages/BookingsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
