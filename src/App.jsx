import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Review from "./pages/Review";
import News from "./pages/News";
import Playlist from "./pages/Playlist";

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Navbar />

        {/* Main content */}
        <main className="flex-1 text-white min-h-screen ml-0 md:ml-64 mb-10 mr-2 transition-all">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/review" element={<Review />} />
            <Route path="/news" element={<News />} />
            <Route path="/playlist" element={<Playlist />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;