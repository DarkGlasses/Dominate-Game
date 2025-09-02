import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchPopup from './SearchPopup';
import cardDataGame from "../service/cardDataGame"; // Import ข้อมูลเกม

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Home", link: "/", icon: "bi-house" },
    { name: "Review", link: "/Review", icon: "bi-controller" },
    { name: "Search", link: "", icon: "bi-search" }, // เปลี่ยน link เป็น string ว่าง
    { name: "News", link: "/News", icon: "bi-newspaper" },
    { name: "Playlist", link: "/Playlist", icon: "bi-bookmark" },
  ];

  const handleSearchClick = (e) => {
    e.preventDefault();
    setIsSearchPopupOpen(true);
    setOpen(false);
  };

  return (
    <>
      {/* Header มือถือ: Burger + Logo */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md p-4 flex items-center gap-10">
        <button
          className="p-2 rounded-lg text-white"
          onClick={() => setOpen(!open)}
        >
          <i className={`bi ${open ? "bi-x-lg" : "bi-list"} text-2xl`}></i>
        </button>
        <img src="images/logo.png" alt="logo" className="w-20 h-20" />
      </div>

      {/* Overlay มือถือ */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-black text-white flex flex-col justify-between transform transition-transform duration-300 z-40
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="mt-20 md:mt-0">
          {/* Logo บน desktop */}
          <div className="hidden md:flex flex-col items-center py-5">
            <img src="/images/logo.png" alt="logo" className="w-30 h-30 mb-3" />
          </div>

          <hr className="border-t-2 border-red-800 shadow-md py-3 w-3/4 mx-auto" />

          {/* Menu */}
          <nav className="flex flex-col gap-10 mt-6 px-6 text-white">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.link;
              if (item.name === "Search") {
                return (
                  <button
                    key={item.name}
                    onClick={handleSearchClick}
                    className={`flex items-center gap-4 text-lg rounded-lg py-2 px-3 transition-all w-full text-left
                      ${isActive ? "bg-red-800 text-white" : "hover:bg-red-800 text-gray-300"}`}
                  >
                    <i className={`bi ${item.icon} text-xl`}></i>
                    {item.name}
                  </button>
                );
              } else {
                return (
                  <Link
                    key={item.name}
                    to={item.link}
                    className={`flex items-center gap-4 text-lg rounded-lg py-2 px-3 transition-all
                      ${isActive ? "bg-red-800 text-white" : "hover:bg-red-800 text-gray-300"}`}
                    onClick={() => setOpen(false)}
                  >
                    <i className={`bi ${item.icon} text-xl`}></i>
                    {item.name}
                  </Link>
                );
              }
            })}
          </nav>
        </div>

        {/* Contact */}
        <div className="bg-red-800 p-4 text-sm mt-auto">
          <p className="font-bold text-lg text-black">Contact</p>
          <div className="text-white">
            <p>Facebook: Sitthichok kiddee</p>
            <p>Phone: 061-592-9399</p>
            <p>Email: supachok1973@gmail.com</p>
          </div>
        </div>
      </aside>

      {/* Search Popup Component */}
      {isSearchPopupOpen && (
        <SearchPopup
          onClose={() => setIsSearchPopupOpen(false)}
          gameData={cardDataGame}
        />
      )}
    </>
  );
};

export default Navbar;