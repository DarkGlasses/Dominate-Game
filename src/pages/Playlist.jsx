import React, { useState } from 'react';
import cardData_PL from '../service/cardData_PL.js';
import PLPopup from '../components/PLPopup.jsx';

const Playlist = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handleOpenPopup = (playlistItem) => {
    setSelectedPlaylist(playlistItem);
  };

  const handleClosePopup = () => {
    setSelectedPlaylist(null);
  };

  return (
    <div className="flex flex-col items-center p-10 min-h-screen text-white">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-10">
          Playlist
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardData_PL.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-black rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105 active:scale-95"
              onClick={() => handleOpenPopup(playlist)}
            >
              <div className="w-full h-48 bg-[#444] flex items-center justify-center text-gray-400">
                <img
                  src={playlist.image}
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold">{playlist.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedPlaylist && <PLPopup playlist={selectedPlaylist} onClose={handleClosePopup} />}
    </div>
  );
};

export default Playlist;