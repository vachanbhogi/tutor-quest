import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import NotFound from "./components/not-found/NotFound";
import Schedule from "./pages/schedule/Schedule";

function App() {
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule/:id" element={<Schedule />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
