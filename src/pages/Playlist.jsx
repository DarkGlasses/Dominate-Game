import React, { useState } from 'react';
import cardDataGame from '../service/cardDataGame.js';
import GamePopup from '../components/GamePopup.jsx';

const Playlist = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleOpenPopup = (gameItem) => {
    setSelectedGame(gameItem);
  };

  const handleClosePopup = () => {
    setSelectedGame(null);
  };

  return (
    <div className="flex flex-col items-center p-10 min-h-screen text-white">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-10">
          Playlist
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardDataGame.map((game) => (
            <div
              key={game.id}
              className="bg-black rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105 active:scale-95"
              onClick={() => handleOpenPopup(game)}
            >
              <div className="w-full h-48 bg-[#444] flex items-center justify-center text-gray-400">
                <img
                  src={game.img}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold">{game.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedGame && <GamePopup game={selectedGame} onClose={handleClosePopup} />}
    </div>
  );
};

export default Playlist;