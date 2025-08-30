import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Review from "./pages/Review";
import Search from "./pages/Search";
import News from "./pages/News";
import Playlist from "./pages/Playlist";
import Reward from "./pages/Reward";

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
            <Route path="/search" element={<Search />} />
            <Route path="/news" element={<News />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/reward" element={<Reward />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
