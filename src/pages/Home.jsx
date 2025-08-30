import React, { useState, useEffect } from "react";
import cardData_NGU from "../service/cardData_NGU";
import cardData_GR from "../service/cardData_GR"; 
import NGUPopUp from "../components/NGUPopUp";
import GRPopUp from "../components/GRPopUp";

const Home = () => {
  const [currentIndexNGU, setCurrentIndexNGU] = useState(0);
  const [currentIndexGR, setCurrentIndexGR] = useState(0);
  const [visibleCards, setVisibleCards] = useState(5);
  const [selectedGame, setSelectedGame] = useState(null);
  const [popupType, setPopupType] = useState(null); 

  const updateVisibleCards = () => {
    const width = window.innerWidth;
    if (width >= 1280) setVisibleCards(4);
    else if (width >= 1024) setVisibleCards(3);
    else if (width >= 768) setVisibleCards(2);
    else setVisibleCards(1);
  };

  useEffect(() => {
    updateVisibleCards();
    const handleResize = () => {
      updateVisibleCards();
      setCurrentIndexNGU((prev) => Math.min(prev, cardData_NGU.length - visibleCards));
      setCurrentIndexGR((prev) => Math.min(prev, cardData_GR.length - visibleCards));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [visibleCards]);

  const nextSlideNGU = () => {
    if (currentIndexNGU + visibleCards < cardData_NGU.length) {
      setCurrentIndexNGU(currentIndexNGU + visibleCards);
    }
  };

  const prevSlideNGU = () => {
    if (currentIndexNGU - visibleCards >= 0) {
      setCurrentIndexNGU(currentIndexNGU - visibleCards);
    }
  };

  const nextSlideGR = () => {
    if (currentIndexGR + visibleCards < cardData_GR.length) {
      setCurrentIndexGR(currentIndexGR + visibleCards);
    }
  };

  const prevSlideGR = () => {
    if (currentIndexGR - visibleCards >= 0) {
      setCurrentIndexGR(currentIndexGR - visibleCards);
    }
  };

  const handleNGUCardClick = (card) => {
    setSelectedGame(card);
    setPopupType("NGU");
  };

  const handleGRCardClick = (card) => {
    setSelectedGame(card);
    setPopupType("GR");
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
    setPopupType(null);
  };

  return (
    <div className="text-white flex flex-col ml-0 md:ml-10 mt-6 md:mt-10 space-y-12 md:space-y-16">
      {/* Game Upcomming Section */}
      <section className="px-4 relative">
        <h1 className="text-3xl md:text-5xl font-bold mb-10">
          New <span className="text-red-800">GAME</span> Upcoming
        </h1>
        <button
          onClick={prevSlideNGU}
          disabled={currentIndexNGU === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black disabled:opacity-30 rounded-full p-2 z-10"
        >
          <i className="bi bi-chevron-left text-white text-2xl"></i>
        </button>

        <div className="flex justify-center gap-4">
          {cardData_NGU.slice(currentIndexNGU, currentIndexNGU + visibleCards).map((card) => (
            <div
              key={card.id}
              onClick={() => handleNGUCardClick(card)}
              className="bg-black rounded-xl shadow-md flex-shrink-0 cursor-pointer hover:scale-105 transition-transform hover:bg-red-800"
              style={{ width: `${100 / visibleCards}%` }}
            >
              <img
                src={card.img}
                alt={card.name}
                className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-t-xl"
              />
              <h2 className="text-sm sm:text-base md:text-lg font-bold py-2 text-center">
                {card.name}
              </h2>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlideNGU}
          disabled={currentIndexNGU + visibleCards >= cardData_NGU.length}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black disabled:opacity-30 rounded-full p-2 z-10"
        >
          <i className="bi bi-chevron-right text-white text-2xl"></i>
        </button>
      </section>

      {/* Game Recommended Section */}
      <section className="px-4 relative">
        <h1 className="text-3xl md:text-5xl font-bold mb-10">
          <span className="text-red-800">GAME</span> Recommended 
        </h1>
        <button
          onClick={prevSlideGR}
          disabled={currentIndexGR === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black disabled:opacity-30 rounded-full p-2 z-10"
        >
          <i className="bi bi-chevron-left text-white text-2xl"></i>
        </button>

        <div className="flex justify-center gap-4">
          {cardData_GR.slice(currentIndexGR, currentIndexGR + visibleCards).map((card) => (
            <div
              key={card.id}
              onClick={() => handleGRCardClick(card)}
              className="bg-black rounded-xl shadow-md flex-shrink-0 cursor-pointer hover:scale-105 transition-transform hover:bg-red-800"
              style={{ width: `${100 / visibleCards}%` }}
            >
              <img
                src={card.img}
                alt={card.name}
                className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-t-xl"
              />
              <h2 className="text-sm sm:text-base md:text-lg font-bold py-2 text-center">
                {card.name}
              </h2>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlideGR}
          disabled={currentIndexGR + visibleCards >= cardData_GR.length}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black disabled:opacity-30 rounded-full p-2 z-10"
        >
          <i className="bi bi-chevron-right text-white text-2xl"></i>
        </button>
      </section>

      {/* Render pop-up ตามประเภทของเกมที่เลือก */}
      {selectedGame && popupType === "NGU" && (
        <NGUPopUp game={selectedGame} onClose={handleCloseModal} />
      )}
      {selectedGame && popupType === "GR" && (
        <GRPopUp game={selectedGame} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Home;