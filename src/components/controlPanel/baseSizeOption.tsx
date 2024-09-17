import React, { useState } from "react";
import { dropDown } from "../helpers/dropDown";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

export const BaseSizeOption = ({ sizeOption, onSizeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Function to handle dropdown toggle
  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className='border rounded-3xl bg-white'>
      <div className="options flex flex-col p-3 box-content">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-sm">Base Size</p>
          </div>
          <div>
            {!isOpen ? (
              <button onClick={toggleDropdown}>
                <MdKeyboardArrowRight />
              </button>
            ) : (
              <button onClick={toggleDropdown}>
                <MdKeyboardArrowDown />
              </button>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="transition-all">
            {["Channel", "8 Fascia", "6 Fascia", "Tube"].map((size) => (
              <div key={size} className="col py-2">
                <input
                  className="mr-2"
                  type="radio"
                  name="baseSize"
                  value={size}
                  checked={sizeOption === size}
                  onChange={onSizeChange}
                />
                <label className="text-sm" htmlFor={size}>{size}</label>
              </div>
            ))}
          </div>
        )}
        <div className="border-b-2 border-b-gray-300 mt-1"></div>
      </div>
    </div>
  );
};
