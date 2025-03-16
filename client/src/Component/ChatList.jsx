import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export function ChatList () {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Menu Button for Mobile */}
      <button 
        className="md:hidden fixed top-30 left-4 z-50 text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`flex flex-col justify-between h-[95vh] w-[300px]   !py-8 gap-4 fixed left-0  ${
          isOpen ? "translate-x-0 w-[200px] !h-[85vh] top-28 bg-gray-800 transition-transform duration-300  z-10" : "-translate-x-full"
        } md:relative md:translate-x-0 `}
      >
        <span className="font-semibold text-xl">Dashboard</span>
        <Link to="/">Create a new chart</Link>
        <Link to="/">Explore Sintu AI</Link>
        <Link to="/">Contact</Link>
        <hr />
        <span className="font-semibold text-xl">RECENT CHATS</span>
        <div
          className="flex flex-col gap-3 overflow-y-auto !pr-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {Array(45).fill("title").map((title, index) => (
            <Link key={index} to="/">{title}</Link>
          ))}
        </div>
        <hr />

        <div className="flex items-center justify-center gap-4 flex-shrink-0">
          <img src="/logo.png" alt="" className="w-[30px] h-[30px]" />
          <div className="flex flex-col">
            <span className="font-semibold">Upgrade to Sintu AI pro</span>
            <span className="text-gray-300 text-sm">
              Get unlimited access to all features
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

