import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cardData_News from '../service/cardData_News'; 
import cardDataGame from '../service/cardDataGame';
import GamePopup from './GamePopup';
import NewsPopUp from './NewsPopUp';

const SearchPopup = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null); 
  const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate();

  // ฟังก์ชันสำหรับค้นหาข้อมูล
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filteredGames = cardDataGame.filter(game =>
      game.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      game.genre.toLowerCase().includes(lowerCaseSearchTerm)
    ).map(game => ({
      ...game,
      type: 'game'
    }));

    const filteredNews = cardData_News.filter(news =>
      news.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      news.shortSummary.toLowerCase().includes(lowerCaseSearchTerm) ||
      news.summary.toLowerCase().includes(lowerCaseSearchTerm)
    ).map(news => ({
      ...news,
      type: 'news'
    }));

    setSearchResults([...filteredGames, ...filteredNews]);
  };

  // ใช้ useEffect เพื่อเรียก handleSearch ทุกครั้งที่ searchTerm เปลี่ยนแปลง
  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  // ฟังก์ชันเมื่อคลิกที่รายการผลลัพธ์
  const handleResultClick = (result) => {
    if (result.type === 'news') {
      setSelectedNews(result); 
    } else if (result.type === 'game') {
      setSelectedGame(result);
    }
  };

  if (selectedNews) {
    return <NewsPopUp newsItem={selectedNews} onClose={() => { setSelectedNews(null); onClose(); }} />;
  }

  if (selectedGame) {
    return <GamePopup game={selectedGame} onClose={() => { setSelectedGame(null); onClose(); }} />;
  }

  return (
    <div className="fixed inset-0 bg-opacity-75 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-black p-8 rounded-lg shadow-lg max-w-md w-full m-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-red-800 mb-6 text-center">Search</h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 rounded-md bg-[#484848] text-white focus:outline-none focus:border-red-600"
            placeholder="game name,Genre or News..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Search Results */}
        <div className="max-h-60 overflow-y-auto">
          {searchTerm.length > 0 && searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="bg-[#484848] p-3 rounded-md mb-2 cursor-pointer hover:bg-red-800 transition-colors"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-center">
                    {/* แสดงไอคอนหรือข้อความบอกประเภท */}
                    {result.type === 'game' ? (
                      <span className="text-green-400 mr-2 text-xl"><i className="bi bi-controller"></i></span>
                    ) : (
                      <span className="text-blue-400 mr-2 text-xl"><i className="bi bi-newspaper"></i></span>
                    )}
                    <h3 className="text-white font-bold">{result.name || result.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm ml-7">{result.genre || result.shortSummary || 'News'}</p>
                </li>
              ))}
            </ul>
          ) : (
            searchTerm.length > 0 && <p className="text-gray-400 text-center">No result</p>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default SearchPopup;