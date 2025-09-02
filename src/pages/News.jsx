import React, { useState, useEffect } from 'react';
import cardData_News from '../service/cardData_News';
import NewsPopUp from '../components/NewsPopUp';

const News = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const popularNews = cardData_News.slice(0, 4);
  const latestNews = cardData_News.slice(4);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % popularNews.length);
    }, 5000); // สไลด์เปลี่ยนทุก 5 วินาที

    return () => clearInterval(slideInterval);
  }, [popularNews.length]);

  const handleOpenPopup = (newsItem) => {
    setSelectedNews(newsItem);
  };

  const handleClosePopup = () => {
    setSelectedNews(null);
  };

  return (
    <div className="flex flex-col items-center p-10 min-h-screen text-white">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-10">
          Latest News
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Trending Section - ย้ายมาไว้ด้านบน */}
          <div className="lg:order-2 space-y-6">
            <h2 className="text-3xl font-bold mb-4 flex items-center space-x-2 relative">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm12.75-9h.008v.008h-.008V10.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <span className="text-red-600">Popular</span> Trending
            </h2>
            <ol className="list-none space-y-4 relative">
              {popularNews.map((newsItem, index) => (
                <li 
                  key={newsItem.id} 
                  className="bg-black p-4 rounded-xl flex items-center space-x-4 shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105 active:scale-95"
                  onClick={() => handleOpenPopup(newsItem)}
                >
                  <span className="text-2xl font-bold text-red-600">{index + 1}</span>
                  <h3 className="text-lg font-semibold">{newsItem.title}</h3>
                </li>
              ))}
            </ol>
          </div>

          {/* Latest News Section - ย้ายมาไว้ด้านซ้าย */}
          <div className="lg:order-1 lg:col-span-2 space-y-8">
            {/* Large News Card - เปลี่ยนเป็นสไลด์โชว์ */}
            <div className="relative overflow-hidden bg-black rounded-xl shadow-lg h-80">
              {popularNews.map((newsItem, index) => (
                <div
                  key={newsItem.id}
                  className={`
                    absolute top-0 left-0 w-full h-full transform transition-all duration-1000 ease-in-out cursor-pointer
                    ${index === currentSlide ? 'opacity-100' : 'opacity-0'}
                  `}
                  onClick={() => handleOpenPopup(popularNews[currentSlide])}
                >
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <img src={newsItem.image} alt={newsItem.title} className="w-full h-full object-cover"/>
                  </div>
                  <div className="p-6 absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-2xl font-bold mb-2">{newsItem.title}</h3>
                    <p className="text-gray-400 text-sm">{newsItem.shortSummary}</p>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {popularNews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`
                      w-3 h-3 rounded-full transition-colors duration-300
                      ${index === currentSlide ? 'bg-red-600' : 'bg-gray-500 hover:bg-red-400'}
                    `}
                  />
                ))}
              </div>
            </div>

            {/* Smaller News Cards */}
            {latestNews.map((newsItem) => (
              <div
                key={newsItem.id} 
                className="bg-black rounded-xl p-6 flex items-center space-x-6 shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105 active:scale-95"
                onClick={() => handleOpenPopup(newsItem)}
              >
                <div className="w-40 h-32 flex-shrink-0 overflow-hidden bg-[#444444] rounded-lg">
                  <img src={newsItem.image} alt={newsItem.title} className="w-full h-full object-cover"/>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{newsItem.title}</h3>
                  <p className="text-gray-400 text-sm">{newsItem.shortSummary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedNews && <NewsPopUp newsItem={selectedNews} onClose={handleClosePopup} />}
    </div>
  );
};

export default News;