import React, { useState } from "react";
import { dropDown } from "../helpers/dropDown";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

export const BottomOption = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //   const displayOptions = () => {
  //     setIsOpen((prev) => !prev);
  //   };

  const labels = [
    {
      value: "None",
      name: "none",
    },
    {
      value: "Chest of Drawers",
      name: "chestD",
    },
    {
      value: "Hanging",
      name: "hanging",
    },
    {
      value: "2 Shelves",
      name: "2shelves",
    },
    {
      value: "shoe Shelves",
      name: "shoeShelves",
    },
    {
      value: "4 Drawers",
      name: "4Drawers",
    },
    {
      value: "Cubbies & Chest",
      name: "cub&ches",
    },
    {
      value: "2 Drawers & Shelves",
      name: "drawer&shelves",
    },
  ];

  return (
    <div className="options flex flex-col bottom-1 p-2 box-content">
      <div className="flex justify-between">
        <div>
          <p className="font-bold text-sm">
            BOTTOM OPTIONS{"   "}
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
      {isOpen && (
        <div>
          {labels.map((label, index) => (
            <div key={index} className="col py-2">
              <input className="mr-2" type="radio" name={label.name} id="" />
              <label className="text-sm" htmlFor={label.name}>
                {label.value}
              </label>
            </div>
          ))}
        </div>
      )}

      <div className="border-b-2 border-b-gray-300"></div>
    </div>
  );
};
