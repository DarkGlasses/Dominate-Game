import React, { useState } from 'react';

const Review = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "Nong-Aun",
      gameName: "Cyberpunk 2077",
      rating: 5,
      comment: "เกมนี้สนุกและน่าติดตามมากครับ! ภาพสวย เนื้อเรื่องลึกซึ้ง ชอบมากเลย!",
      date: "August 28, 2025"
    },
  ]);

  const [newReview, setNewReview] = useState({
    user: "",
    gameName: "",
    rating: "",
    comment: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.user && newReview.gameName && newReview.comment && newReview.rating) {
      const newId = reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1;
      const reviewToAdd = {
        ...newReview,
        id: newId,
        date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
      };
      setReviews([reviewToAdd, ...reviews]);
      setNewReview({ user: "", gameName: "", rating: "", comment: "" });
    } else {
      alert("โปรดกรอกข้อมูลให้ครบทุกช่อง");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="text-yellow-400">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="text-gray-400">&#9733;</span>);
      }
    }
    return stars;
  };

  return (
    <div className="flex flex-col items-center p-10 min-h-screen  text-white">
      <div className="w-full max-w-4xl">
        <h1 className="text-5xl md:text-5xl font-bold mb-10 text-left">
          User <span className="text-red-800">REVIEWS</span>
        </h1>

        {/* Review Submission Form */}
        <section className="bg-black p-8 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-6">Write you review</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="user" className="block text-sm font-medium mb-2">User name</label>
              <input
                type="text"
                id="user"
                name="user"
                value={newReview.user}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-[#484848] border border-transparent focus:outline-none focus:ring-2 focus:ring-red-800"
              />
            </div>
            <div>
              <label htmlFor="gameName" className="block text-sm font-medium mb-2">Game name</label>
              <input
                type="text"
                id="gameName"
                name="gameName"
                value={newReview.gameName}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-[#484848] border border-transparent focus:outline-none focus:ring-2 focus:ring-red-800"
              />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium mb-2">Rating (1-5)</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={newReview.rating}
                onChange={handleInputChange}
                min="1"
                max="5"
                className="w-full p-3 rounded-lg bg-[#484848] border border-transparent focus:outline-none focus:ring-2 focus:ring-red-800"
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-2">Comment</label>
              <textarea
                id="comment"
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                rows="5"
                className="w-full p-3 rounded-lg bg-[#484848] border border-transparent focus:outline-none focus:ring-2 focus:ring-red-800 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-red-800 hover:bg-red-600 transition-colors font-bold text-lg"
            >
              Post review
            </button>
          </form>
        </section>

        {/* Review List */}
        <section className="pt-4">
          <h2 className="text-3xl font-bold mb-6">Latest Review</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-black p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">{review.user}</span>
                  <span className="text-sm text-gray-400">{review.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-red-800">{review.gameName}</h3>
                <div className="my-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-white">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Review;