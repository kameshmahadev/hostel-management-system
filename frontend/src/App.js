import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoomAllocation from "./pages/RoomAllocation";
import Billing from "./pages/Billing";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/room-allocation" element={<RoomAllocation />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>
    </Router>
  );
};

export default App;
