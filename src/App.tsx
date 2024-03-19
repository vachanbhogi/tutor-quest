import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/home/Home";
import NotFound from "./components/not-found/NotFound";
import Schedule from "./pages/schedule/Schedule";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";
import TutorForm from "./pages/tutor-form/TutorForm";
import Tutors from "./pages/tutors/Tutors"
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <AuthProvider>
      <div className="bg-gray-100 h-screen flex flex-col">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule/:id" element={<Schedule />} />
            <Route path="/become-a-tutor" element={<TutorForm />} />
            <Route path="/find-a-tutor" element={<Tutors />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;