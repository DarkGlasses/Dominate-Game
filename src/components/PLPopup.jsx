import React, { useState, useEffect } from 'react';

const PLPopup = ({ playlist, onClose }) => {
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

  if (!playlist) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div 
        className={`
          bg-[#1a1a1a] rounded-xl shadow-2xl p-6 md:p-8 max-w-2xl w-full relative 
          transform transition-all duration-300 ease-in-out
          ${showPopup ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 text-3xl font-bold hover:text-red-600 transition-colors"
        >
          &times;
        </button>

        {/* รูปภาพของเพลย์ลิสต์ */}
        <div className="w-full mb-6 rounded-lg overflow-hidden shadow-lg">
          <img
            src={playlist.image}
            alt={playlist.name}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="flex-1 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-red-600 border-b border-gray-700 pb-2">
            {playlist.name}
          </h2>
          <p className="text-xl font-semibold text-white mb-4">Games in this playlist:</p>
          <ul className="list-disc list-inside text-md text-gray-200 space-y-2 mb-6">
            {playlist.games.map((gameName, index) => (
              <li key={index}>{gameName}</li>
            ))}
          </ul>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleClose}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-md"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PLPopup;