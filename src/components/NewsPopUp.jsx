import React, { useState, useEffect } from 'react';

const NewsPopUp = ({ newsItem, onClose }) => {
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

  if (!newsItem) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-75 z-50 backdrop-blur-sm">
      <div
        className={`
          bg-black p-8 rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto relative text-white
          transform transition-all duration-300 ease-in-out
          ${showPopup ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-red-800 transition-colors text-3xl font-bold"
        >
          &times;
        </button>
        <div className="mb-4 rounded-lg overflow-hidden">
          <img src={newsItem.image} alt={newsItem.title} className="w-full h-full object-cover"/>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-red-800">{newsItem.title}</h2>
        <p className="text-gray-300">{newsItem.summary}</p>
        {newsItem.source && (
          <p className="text-gray-500 text-sm mt-4">ที่มา: {newsItem.source}</p>
        )}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClose}
            className="bg-red-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-500 transition-colors"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsPopUp;