import React, { useState, useEffect } from "react";

const GRPopUp = ({ game, onClose }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // เมื่อ Pop-up ถูก mount ให้ตั้งค่า showPopup เป็น true เพื่อเริ่ม animation
    setShowPopup(true);
  }, []);

  const handleClose = () => {
    // เมื่อกดปิด ให้เริ่ม animation fade-out และ scale-down
    setShowPopup(false);
    // หลังจาก animation จบ (300ms) ค่อยเรียก onClose เพื่อถอด component ออกจาก DOM
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!game) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-opacity-75 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div 
        className={`
          bg-black rounded-xl shadow-2xl p-6 md:p-8 max-w-2xl w-full relative 
          transform transition-all duration-300 ease-in-out
          ${showPopup ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 text-3xl font-bold hover:text-red-800 transition-colors"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-white">
          <div className="flex-shrink-0 w-full md:w-1/3">
            <img
              src={game.img}
              alt={game.name}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-red-800 border-b border-gray-700 pb-2">{game.name}</h2>
            <p className="text-md text-gray-300 mb-2">
              <span className="font-semibold text-white">Genre:</span> {game.genre}
            </p>
            <p className="text-md text-gray-300 mb-2">
              <span className="font-semibold text-white">Release Date:</span> {game.releaseDate}
            </p>
            <p className="text-md text-gray-300 mb-2">
              <span className="font-semibold text-white">Rating:</span> {game.rating}
            </p>
            <p className="text-md text-gray-300 mb-4">
              <span className="font-semibold text-white">Platforms:</span> {game.platforms}
            </p>
            <p className="text-md text-gray-200 mb-6 leading-relaxed">{game.description}</p>
            <a
              href={game.videoTrailer}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-red-800 text-white rounded-lg font-bold hover:bg-red-500 transition-colors shadow-md"
            >
              Watch Trailer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GRPopUp;