import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Schedule from "./pages/schedule/Schedule";

function App() {
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
