
'use client';
import { useState } from "react";
import { BsTranslate } from "react-icons/bs";
import { FaMicrophoneLines } from "react-icons/fa6";
import { FaCameraRetro } from "react-icons/fa";

export default function TranslationButton() {
  const [isOpen, setIsOpen] = useState(false);


  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
  
    <div className="fixed bottom-5 right-5 duration-500 ease-in-out" style={{ zIndex: 1000 }}>
      {/* Floating Translate Button */}
      <button
        onClick={handleButtonClick}
        className="bg-gradient-to-r from-blue-500 to-red-500 text-white rounded-full shadow-lg p-4 hover:scale-105 transition-transform"
      >
        <BsTranslate className="text-3xl" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0  shadow-lg rounded-lg p-4 w-60 duration-500 ease-in-out">
          <button
            onClick={handleButtonClick}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
          </button>

          <ul className="space-y-3">
            <li>
              <button className="bg-gradient-to-r from-blue-500 to-red-500 w-full h-9 bg-blue-500 hover:bg-blue-600 text-white  rounded-lg shadow flex  items-center justify-around">
                <FaMicrophoneLines className="" /> Speak
              </button>
            </li>
            <li>
            <button className="bg-gradient-to-r from-blue-500 to-red-500 w-full h-9 bg-blue-500 hover:bg-blue-600 text-white  rounded-lg shadow flex  items-center justify-around">
                <FaCameraRetro /> Scan
              </button>
            </li>
            {/* <li>
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg shadow">
                View Translation
              </button>
            </li> */}
          </ul>
        </div>
      )}
    </div>
  );
}