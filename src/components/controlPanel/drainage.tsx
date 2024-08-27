import React, { useState } from "react";
import { dropDown } from "../helpers/dropDown";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";


export const Drainage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const labels = [
    { value: "Scupper", name: "scupper" },
    { value: "Downspout Leader", name: "downspout" },
    { value: "Mirror Doors", name: "mirror" },
    { value: "Tie into Building", name: "intoBuilding" },
  ];

  return (
    <div className="options flex flex-col p-3 box-content">
      <div className="flex justify-between">
        <div>
          <p className="font-bold text-sm">
            Drainage
            {/* <span className="underline font-normal"> 2 Shelves</span> */}
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
