import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadReport from "./pages/UploadReport";
import History from "./pages/History";
import Analysis from "./pages/Analysis";
import MedicineScanner from "./pages/MedicineScanner";
import Settings from "./pages/Settings";
import ChatAssistant from "./pages/ChatAssistant";
import MedicineHistory from "./pages/MedicineHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Features */}
        <Route path="/upload" element={<UploadReport />} />
        <Route path="/history" element={<History />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/medicine" element={<MedicineScanner />} />
        <Route path="/medicine-scanner" element={<MedicineScanner />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chat" element={<ChatAssistant />} />
        <Route path="/history" element={<History />} />

<Route
  path="/medicine-history"
  element={<MedicineHistory />}
/>
      

      </Routes>
    </BrowserRouter>
  );
}

export default App;