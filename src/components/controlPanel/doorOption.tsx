import React, { useState } from "react";
import { dropDown } from "../helpers/dropDown";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";


export const DoorOption = () => {
  const [isOpen, setIsOpen] = useState(false);
  const labels = [
    { value: "None", name: "none" },
    { value: "Slab Doors", name: "slab" },
    { value: "Mirror Doors", name: "mirror" },
    { value: "Shaker Doors", name: "shaker" },
  ];

  return (
    <div className="options flex flex-col p-3 box-content">
      <div className="flex justify-between">
        <div>
          <p className="font-bold text-sm">
            DOOR OPTIONS
            <span className="underline font-normal"> 2 Shelves</span>
          </p>
        </div>
        <div>
        {!isOpen ? (
            <button
              onClick={() => dropDown(setIsOpen((prev) => !prev))}
              className=""
            >
              <MdKeyboardArrowRight />
            </button>
          ) : (
            <button
              onClick={() => dropDown(setIsOpen((prev) => !prev))}
              className=""
            >
              <MdKeyboardArrowDown />
            </button>
          )}
        </div>
      </div>

    {isOpen &&
    <div className="transition-all">
    {labels.map((label, index) => (
      <div key={index} className="col py-2">
        <input className="mr-2" type="radio" name={label.name} id="" />
        <label className="text-sm" htmlFor={label.name}>{label.value}</label>
      </div>
    ))}
    
  </div>
    }
      <div className="border-b-2 border-b-gray-300 mt-1"></div>
    </div>
  );
};
